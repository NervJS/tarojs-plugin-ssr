import * as path from 'path'
import spawn from 'cross-spawn'
import * as child_process from 'child_process'
import treeKill from 'tree-kill'

interface CommandOptions {
    cwd?: string
    env?: NodeJS.ProcessEnv
    nodeArgs?: string[]
    stderr?: string
    stdout?: string
    ignoreFail?: boolean
}

export function runTaroCommand(argv: string[], options: CommandOptions = {}) {
    const taroDir = path.dirname(require.resolve('@tarojs/cli'))
    const taroBin = path.join(taroDir, 'bin/taro')

    const cwd = options.cwd
    const env = options.env

    return new Promise((resolve, reject) => {
        console.log(`Running command "taro ${argv.join(' ')}"`)
        const instance = spawn(
            'node',
            [...(options.nodeArgs || []), '--no-deprecation', taroBin, ...argv],
            {
                cwd,
                env,
                stdio: ['ignore', 'pipe', 'pipe']
            }
        )

        let mergedStdio = ''

        let stderrOutput = ''
        if (options.stderr) {
            instance.stderr!.on('data', function (chunk) {
                mergedStdio += chunk
                stderrOutput += chunk

                if (options.stderr === 'log') {
                    console.log(chunk.toString())
                }
            })
        } else {
            instance.stderr!.on('data', function (chunk) {
                mergedStdio += chunk
            })
        }

        let stdoutOutput = ''
        if (options.stdout) {
            instance.stdout!.on('data', function (chunk) {
                mergedStdio += chunk
                stdoutOutput += chunk

                if (options.stdout === 'log') {
                    console.log(chunk.toString())
                }
            })
        } else {
            instance.stdout!.on('data', function (chunk) {
                mergedStdio += chunk
            })
        }

        instance.on('close', (code, signal) => {
            if (
                !options.stderr &&
                !options.stdout &&
                !options.ignoreFail &&
                code !== 0
            ) {
                return reject(
                    new Error(`command failed with code ${code}\n${mergedStdio}`)
                )
            }

            resolve({
                code,
                signal,
                stdout: stdoutOutput,
                stderr: stderrOutput
            })
        })

        instance.on('error', err => {
            (err as any).stdout = stdoutOutput
            ;(err as any).stderr = stderrOutput
            reject(err)
        })
    })
}

interface CommandDevOptions {
    cwd?: string
    env?: NodeJS.ProcessEnv
    nodeArgs?: string[]
    stderr?: string | boolean
    stdout?: string | boolean
    bootupMarker?: RegExp
    onStdout?: (message: string) => void
    onStderr?: (message: string) => void
}

export function runTaroCommandDev(argv: string[], opts: CommandDevOptions = {}): Promise<child_process.ChildProcess> {
    console.log(`Running command "taro ${argv.join(' ')}"`)
    const taroDir = path.dirname(require.resolve('@tarojs/cli'))
    const taroBin = path.join(taroDir, 'bin/taro')

    const cwd = opts.cwd
    const env = opts.env

    const bootupMarker = opts.bootupMarker || /Compiled to Next.js application successfully/i

    const nodeArgs = opts.nodeArgs || []
    return new Promise((resolve, reject) => {
        const instance = spawn(
            'node',
            [
                ...nodeArgs,
                taroBin,
                ...argv
            ],
            {
                cwd,
                env
            }
        )
        let didResolve = false

        function handleStdout(data) {
            const message = data.toString()
            if (bootupMarker.test(message)) {
                if (!didResolve) {
                    didResolve = true
                    resolve(instance)
                }
            }
            if (typeof opts.onStdout === 'function') {
                opts.onStdout(message)
            }

            if (opts.stdout !== false) {
                process.stdout.write(message)
            }
        }

        function handleStderr(data) {
            const message = data.toString()
            if (typeof opts.onStderr === 'function') {
                opts.onStderr(message)
            }

            if (opts.stderr !== false) {
                process.stderr.write(message)
            }
        }

        instance.stdout.on('data', handleStdout)
        instance.stderr.on('data', handleStderr)

        instance.on('close', () => {
            instance.stdout.removeListener('data', handleStdout)
            instance.stderr.removeListener('data', handleStderr)
        })

        instance.on('error', reject)
    })
}

export function taroBuild(opts: CommandOptions = {}) {
    return runTaroCommand(['build', '--type', 'nextjs'], opts)
}

export function taroDev(opts: CommandDevOptions = {}) {
    return runTaroCommandDev(['build', '--type', 'nextjs', '--watch'], opts)
}

export async function killProcess(pid: number): Promise<void> {
    await new Promise((resolve, reject) => {
        treeKill(pid, (err) => {
            if (err) {
                if (
                    process.platform === 'win32' &&
                    typeof err.message === 'string' &&
                    (err.message.includes('no running instance of the task') ||
                        err.message.includes('not found'))
                ) {
                    // Windows throws an error if the process is already dead
                    //
                    // Command failed: taskkill /pid 6924 /T /F
                    // ERROR: The process with PID 6924 (child process of PID 6736) could not be terminated.
                    // Reason: There is no running instance of the task.
                    return resolve(undefined)
                }
                return reject(err)
            }

            resolve(undefined)
        })
    })
}

// Kill a launched app
export async function killApp(instance) {
    await killProcess(instance.pid)
}
