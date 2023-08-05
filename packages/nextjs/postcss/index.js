// 同步 Taro 项目中 packages/taro-webpack5-runner/src/postcss/postcss.h5.ts 中的逻辑
const path = require('path')
const { merge, cloneDeep } = require('lodash')
const { sync } = require('resolve')

const platform = 'h5'

const defaultAutoprefixerOption = {
    enable: true,
    config: {
        flexbox: 'no-2009'
    }
}

const defaultPxtransformOption = {
    enable: true,
    config: {
        platform
    }
}

const defaultConstparseOption = {
  constants: [
    {
        key: 'taro-tabbar-height',
        val: '50PX'
    }
  ],
  platform
}

const defaultHtmltransformOption = {
    enable: true,
    config: {
        platform,
        removeCursorStyle: false
    }
}

const defaultUrlOption = {
    enable: true,
    config: {
        url: 'rebase'
    }
}

function isEnable(option) {
    return !option || !('enable' in option) || option.enable
}

function isNpmPkg(name) {
    return !/^(\.|\/)/.test(name)
}

const getPostCssConfig = getConfig => {
    // 处理 Taro 编译配置，同步 taro-service/src/Config.ts 中的逻辑
    const config = getConfig(merge)
    const { designWidth = 750, deviceRatio, h5 } = config

    // 处理 postcss 配置，同步 taro-webpack5-runner/src/postcss/postcss.h5.ts 中的逻辑
    const { autoprefixer, pxtransform, htmltransform, url, cssModules, ...rest } = h5.postcss

    const plugins = []

    plugins.push(require.resolve('postcss-import'))

    const autoprefixerOption = merge({}, defaultAutoprefixerOption, autoprefixer)
    if (isEnable(autoprefixerOption)) {
        plugins.push([require.resolve('autoprefixer'), autoprefixerOption])
    }
    if (designWidth) {
        defaultPxtransformOption.config.designWidth = designWidth
    }
    if (deviceRatio) {
        defaultPxtransformOption.config.deviceRatio = deviceRatio
    }
    const pxtransformOption = merge({}, defaultPxtransformOption, pxtransform)
    if (isEnable(pxtransformOption)) {
        plugins.push([require.resolve('postcss-pxtransform'), pxtransformOption])
    }
    
    const htmlTransformOption = merge({}, defaultHtmltransformOption, htmltransform)
    if (isEnable(htmlTransformOption)) {
        plugins.push([require.resolve('postcss-html-transform'), htmlTransformOption])
    }

    plugins.push([require.resolve('postcss-plugin-constparse'), cloneDeep(defaultConstparseOption)])

    // TODO: 处理 postcss-alias 插件

    const urlOption = merge({}, defaultUrlOption, url)
    if (isEnable(urlOption)) {
        plugins.push([require.resolve('postcss-url'), urlOption])
    }

    const appPath = process.cwd()
    for (let [pluginName, pluginOption] of Object.entries(rest)) {
        if (!isEnable(pluginOption)) {
            break
        }
        if (!isNpmPkg(pluginName)) {
            // local plugin
            pluginName = path.join(appPath, pluginName)
        }
        try {
            const pluginPath = sync(pluginName, { basedir: appPath })
            plugins.push(require(pluginPath)(pluginOption.config || {}))
        } catch (e) {
            const msg = e.code === 'MODULE_NOT_FOUND' ? `缺少 postcss 插件 "${pluginName}", 已忽略` : e
            console.log(msg)
        }
    }

    return {
        plugins
    }
}

module.exports = getPostCssConfig
