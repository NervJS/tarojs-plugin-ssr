const path = require('path')
const spawn = require('cross-spawn')

function runTaroCommand(argv, options = {}) {
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
                ...options.spawnOptions,
                cwd,
                env,
                stdio: ['ignore', 'pipe', 'pipe']
            }
        )

        if (typeof options.instance === 'function') {
            options.instance(instance)
        }

        let mergedStdio = ''

        let stderrOutput = ''
        if (options.stderr) {
            instance.stderr.on('data', function (chunk) {
                mergedStdio += chunk
                stderrOutput += chunk

                if (options.stderr === 'log') {
                    console.log(chunk.toString())
                }
            })
        } else {
            instance.stderr.on('data', function (chunk) {
                mergedStdio += chunk
            })
        }

        let stdoutOutput = ''
        if (options.stdout) {
            instance.stdout.on('data', function (chunk) {
                mergedStdio += chunk
                stdoutOutput += chunk

                if (options.stdout === 'log') {
                    console.log(chunk.toString())
                }
            })
        } else {
            instance.stdout.on('data', function (chunk) {
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
                stderr: stderrOutput,
            })
        })

        instance.on('error', (err) => {
            err.stdout = stdoutOutput
            err.stderr = stderrOutput
            reject(err)
        })
    })
}

function taroBuild(opts = {}) {
    return runTaroCommand(['build', '--type', 'nextjs'], opts)
}

module.exports = {
    taroBuild
}
