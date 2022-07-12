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

Taro H5 官方的组件库是基于 Stencil 工具链开发的 Web Components，为了便于 SSR，开发了功能接口一致的 React 版本的组件库，位于 `nextjs/components` 目录下。通过 Babel 插件，在 Next.js 项目编译阶段将 @tarojs/components 替换为 React 版本的组件库。

* @tarojs/taro

Taro H5 官方的 API 库不考虑 Node 端且依赖官方自己的 H5 运行时 @tarojs/runtime，故无法直接使用。开发功能接口一致的且可用于 Next.js 的 API 库，位于 `nextjs/taro` 目录下。也是通过 Babel 插件，在 Next.js 项目编译阶段将 @tarojs/taro 替换为可用于 Next.js 的 API 库。

* 设计稿及尺寸单位

Taro H5 端会通过使用 PostCSS 插件将 px 单位转换为 rem 单位的方式来还原设计稿，在 Next.js 项目中添加相同的 PostCSS 插件保持功能一致，代码位于 `nextjs/postcss` 目录下。
