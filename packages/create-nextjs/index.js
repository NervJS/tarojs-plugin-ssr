'use strict'
const path = require('path')
const execa = require('execa')
const hasYarn = require('has-yarn')
const readPkgUp = require('read-pkg-up')
const writePkg = require('write-pkg')
const {run: jscodeshift} = require('jscodeshift/src/Runner')

module.exports = async (options = {}) => {
    const packageResult = readPkgUp.sync({
        cwd: options.cwd,
        normalize: false
    }) || {}
    const packageJson = packageResult.package || {}
    const packagePath = packageResult.path || path.resolve(options.cwd || process.cwd(), 'package.json')
    const packageCwd = path.dirname(packagePath)

    packageJson.scripts = packageJson.scripts || {}

    const s = packageJson.scripts
    s['build:nextjs'] = 'taro build --type nextjs'
    s['dev:nextjs'] = 'npm run build:nextjs -- --watch'

    writePkg.sync(packagePath, packageJson, { normalize: false })

    const transformPath = path.join(__dirname, 'transform.js')
    const configPath = path.join(options.cwd || process.cwd(), 'config/index.js')
    await jscodeshift(transformPath, [configPath], {
        cpu: 1,
        verbose: 0,
        silent: true
    })

    if (options.skipInstall) {
        return
    }

    const nextTag = 'next'
    const pluginTag = 'tarojs-plugin-platform-nextjs'

    if (hasYarn(packageCwd)) {
        const yarnArguments = ['add', nextTag, pluginTag]

        try {
            await execa('yarn', yarnArguments, {
                cwd: packageCwd,
                stdio: 'inherit'
            })
        } catch (error) {
            if (error.code === 'ENOENT') {
                console.error('This project uses Yarn but you don\'t seem to have Yarn installed.\nRun `npm install --global yarn` to install it.')
                return
            }

            throw error
        }

        return
    }

    const npmArguments = ['install']

    npmArguments.push(nextTag)
    npmArguments.push(pluginTag)

    await execa('npm', npmArguments, {
        cwd: packageCwd,
        stdio: 'inherit'
    })
}
