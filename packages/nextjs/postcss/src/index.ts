// 同步 Taro 项目中 packages/taro-webpack5-runner/src/postcss/postcss.h5.ts 中的逻辑
import path from 'path'
import { merge } from 'lodash'
import { sync } from 'resolve'
import type { IHtmlTransformOption, IPostcssOption } from '@tarojs/taro/types/compile'

const platform = 'h5'

const defaultAutoprefixerOption: Record<string, any> = {
    enable: true,
    config: {
        flexbox: 'no-2009'
    }
}

const defaultPxtransformOption: Record<string, any> = {
    enable: true,
    config: {
        platform
    }
}

const defaultConstparseOption: Record<string, any> = {
  constants: [
    {
        key: 'taro-tabbar-height',
        val: '50PX'
    }
  ],
  platform
}

const defaultHtmltransformOption: IHtmlTransformOption = {
    enable: true,
    config: {
        platform,
        removeCursorStyle: false
    }
}

const defaultUrlOption: Record<string, any> = {
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
    const { designWidth = 750, deviceRatio, alias, h5 } = config

    // 处理 postcss 配置，同步 taro-webpack5-runner/src/postcss/postcss.h5.ts 中的逻辑
    const { autoprefixer, pxtransform, htmltransform, url, cssModules, ...rest } = h5.postcss as IPostcssOption

    const plugins: any[] = []

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
        plugins.push([require.resolve('postcss-pxtransform'), pxtransformOption.config || {}])
    }
    
    const htmlTransformOption = merge({}, defaultHtmltransformOption, htmltransform)
    if (isEnable(htmlTransformOption)) {
        plugins.push([require.resolve('postcss-html-transform'), htmlTransformOption.config || {}])
    }

    plugins.push([require.resolve('postcss-plugin-constparse'), defaultConstparseOption.config || {}])

    const aliasOption = { config: { alias } }
    plugins.push([require.resolve('./postcss-alias'), aliasOption])

    const urlOption = merge({}, defaultUrlOption, url)
    if (isEnable(urlOption)) {
        plugins.push([require.resolve('postcss-url'), urlOption.config || {}])
    }

    const appPath = process.cwd()
    for (const [name, pluginOption] of Object.entries(rest)) {
        let pluginName = name
        if (!isEnable(pluginOption)) {
            break
        }
        if (!isNpmPkg(pluginName)) {
            // local plugin
            pluginName = path.join(appPath, pluginName)
        }
        try {
            const pluginPath = sync(pluginName, { basedir: appPath })
            plugins.push([pluginPath, pluginOption.config || {}])
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
