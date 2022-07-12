# 架构设计

这文档来阐述该插件是如何工作的。它的目的是帮助大家理解代码，理解插件是如何工作的，并希望使大家能够参与到插件的开发。

## 概览

Taro 在 3.1 版本提出了开放式架构的思想，让开发者可以通过编写插件来支持一个新的平台，具体文档在 [这里](https://taro-docs.jd.com/taro/blog/2021-03-10-taro-3-1-lts#1-%E5%BC%80%E6%94%BE%E5%BC%8F%E6%9E%B6%E6%9E%84)。

该项目就是通过编写 Taro 插件，将 React 生态中知名框架 Next.js 作为 Taro 的一个目标平台，以此让 Taro 能够支持 Pre-rendering、SSR 和 ISR。

插件的工作可以分为两个主要阶段：生成 Next.js 项目和适配 Taro 项目代码。

### 生成 Next.js 项目

该功能由编写的 Taro 插件提供，代码位于 `nextjs/src` 目录下。

插件会先在 `outputRoot` 目录下生成一个完整的 Next.js 项目，该过程中使用的项目模板在 `nextjs/template` 目录下。

接着将 `sourceRoot` 目录下开发的 Taro 项目代码复制到 Next.js 项目的 `src` 目录下。这个过程除了会根据文件的 [端类型](https://docs.taro.zone/docs/envs#%E7%BB%9F%E4%B8%80%E6%8E%A5%E5%8F%A3%E7%9A%84%E5%A4%9A%E7%AB%AF%E6%96%87%E4%BB%B6) 后缀来挑选文件外，不会对代码文件进行任何处理。

最后根据 Taro 的全局配置文件 `app.config.js` 中的 `pages` 和 `subPackages` 配置项，来生成 Next.js 项目的路由，即 Next.js 的 `pages` 目录。

### 适配 Taro 代码

编写的 Taro 代码是无法直接在 Next.js 项目中执行的，同过 Babel 插件、PostCSS 插件、Webpack 配置等方式，在 Next.js 项目层面上来进行适配。

* @tarojs/components

Taro H5 官方的组件库是基于 Stencil 工具链开发的 Web Components，为了便于 SSR，开发了功能接口一致的 React 版本的组件库，位于 `nextjs/components` 目录下。通过 Babel 插件，在 Next.js 项目编译阶段替换 @tarojs/components。

* @tarojs/taro

Taro H5 官方的 API 库不考虑 Node 端且依赖官方自己的 H5 运行时 @tarojs/runtime，故无法直接使用。开发功能接口一致的且可用于 Next.js 的 API 库，位于 `nextjs/taro` 目录下。也是通过 Babel 插件，在 Next.js 项目编译阶段替换 @tarojs/taro。

* 设计稿及尺寸单位

Taro H5 端会通过使用 PostCSS 插件将 px 单位转换为 rem 单位的方式来还原设计稿，在 Next.js 项目中添加相同的 PostCSS 插件保持功能一致，代码位于 `nextjs/postcss` 目录下。

## 关于 Next.js 项目模板

Next.js 的项目模板位于 `nextjs/template` 目录下，其中使用 ejs 来编写各文件，便于插件向其中注入必要的参数。

* babel.config.ejs

Babel 的配置文件，其中包含 Next.js 项目本身预设 `next/babel`，在该预设的前后分别配置两个自定义预设，用于在其中添加自定义的 Babel 插件。注意 Babel 配置文件中，预设的执行顺序是反的，从后到前，插件的执行顺序是从前到后。

自定义的 Babel 预设和插件位于 `nextjs/babel` 目录中。

* next.config.ejs

Next.js 框架的配置文件。在其中根据 Taro 项目的编译配置，配置相关的环境变量还自定义 webpack 的配置，比如使用 url-loader 来支持直接在 js 文件中导入图片。

## 关于 Taro 组件库

在 `nextjs/components` 目录下实现的 React 版本的 Taro 组件库，部分代码参考 Taro 2 中的实现，需要考虑对 SSR 的支持。

### TaroBaseProps 接口和 useTaroBaseProps Hook

各组件的属性类型均继承 TaroBaseProps 接口，该接口声明所有组件都需要实现的基本属性。而 useTaroBaseProps Hook 来实现这些属性所定义的功能，使用示例如下：

```TypeScript
import React, {forwardRef} from 'react'
import classNames from 'classnames'
import type {TaroBaseProps} from '../_util/typings'
import useTaroBaseEvents from '../_util/hooks/useTaroBaseEvents'

export interface TextProps extends TaroBaseProps { }

const Text: React.FC<TextProps> = ({
    children,
    ...rest
}, ref) => {
    const props = useTaroBaseEvents(rest)

    return (
        <span {...props}>
            {children}
        </span>
    )
}

export default Text
```

### TaroHoverableProps 接口和 useTaroHoverableEvents Hook

支持 hover 相关功能的组件，其属性类型继承 TaroHoverableProps 接口，而 TaroHoverableProps 接口继承 TaroBaseProps 接口。而 useTaroHoverableEvents Hook 来进行具体的实现，其内部依赖 useTaroBaseProps Hook。

## 关于 Taro API

在 `nextjs/taro` 目录下实现的 Taro API，很多代码直接使用或参考 Taro 本身的 API 实现，但需要考虑在 Node 端上的执行。

### Promisify

为了让异步 API 支持 Promise 调用方式，均使用 `mpromisify` 工具方法进行包装。

### 对环境的支持

Next.js 项目中的代码不仅会运行在浏览器端，还会运行在 Node 端。所以根据 API 所支持的调用环境，对它们进行以下分类：

#### 浏览器端和 Node 端都支持

这些函数内部实现不依赖浏览器端的 DOM 或 BOM API，开发时无需进行任何特殊处理。

#### 仅支持浏览器端

这些函数内部实现会依赖浏览器端的 DOM 或 BOM API，开发时需要对其进行一些额外处理，让该函数不慎在 Node 端调用时给开发者明确的提示信息。可以分成以下几种情况来处理：

* 函数为同步。
    * 无返回值。说明后续操作不会直接依赖该函数。在 Node 端调用时提示用户“该函数在 Node 调用时不会执行任何操作”即可，内部使用 `limited._void` 函数来处理这种情况。
    * 有返回值。说明可能存在后续操作会使用该函数的返回值。在 Node 端调用时必须直接抛出异常“该函数无法在 Node 进行调用”，内部使用 `limited.never` 函数来处理这种情况。
* 函数为异步。异步函数拥有错误处理函数 fail，在 Node 端调用时直接触发 fail 回调即可，内部使用 `limited.async` 函数来处理这种情况。
