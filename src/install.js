const spawn = require('cross-spawn')

function getPkgManager() {
    try {
        const userAgent = process.env.npm_config_user_agent
        if (userAgent) {
            if (userAgent.startsWith('yarn')) {
                return 'yarn'
            } else if (userAgent.startsWith('pnpm')) {
                return 'pnpm'
            }
        }
        try {
            execSync('yarn --version', { stdio: 'ignore' })
            return 'yarn'
        } catch {
            execSync('pnpm --version', { stdio: 'ignore' })
            return 'pnpm'
        }
    } catch {
        return 'npm'
    }
}

function flattenDeps(deps) {
    if (!deps) {
        return
    }
    return Object.keys(deps).map(key => `${key}@${deps[key]}`)
}

/**
 * Spawn a package manager installation with either Yarn or NPM.
 *
 * @returns A Promise that resolves once the installation is finished.
 */
module.exports = function install({
    cwd,
    dependencies: originDependencies,
    devDependencies: originDevDependencies,
    packageManager = getPkgManager()
}) {
    return new Promise((resolve, reject) => {
        const dependencies = flattenDeps(originDependencies)
        const devDependencies = flattenDeps(originDevDependencies)

        let args
        let command = packageManager
        const useYarn = packageManager === 'yarn'

        if (dependencies && dependencies.length) {
            /**
             * If there are dependencies, run a variation of `{packageManager} add`.
             */
            if (useYarn) {
                /**
                 * Call `yarn add --exact (--offline)? (-D)? ...`.
                 */
                args = ['add', '--exact']
                if (devDependencies) args.push('--dev')
                args.push(...dependencies)
            } else {
                /**
                 * Call `(p)npm install [--save|--save-dev] ...`.
                 */
                args = ['install', '--save-exact']
                args.push(devDependencies ? '--save-dev' : '--save')
                args.push(...dependencies)
            }
        } else {
            /**
             * If there are no dependencies, run a variation of `{packageManager} install`.
             */
            args = ['install']
        }

        /**
         * Spawn the installation process.
         */
        const child = spawn(command, args, {
            cwd,
            stdio: 'inherit',
            env: { ...process.env, ADBLOCK: '1', DISABLE_OPENCOLLECTIVE: '1' },
        })
        child.on('close', (code) => {
            if (code !== 0) {
                reject({ command: `${command} ${args.join(' ')}` })
                return
            }
            resolve()
        })
    })
}
