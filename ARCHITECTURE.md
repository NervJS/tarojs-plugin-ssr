# 架构设计

这文档来阐述该插件是如何工作的。它的目的是帮助大家理解代码，理解插件是如何工作的，并希望使大家能够参与到插件的开发。

## 概览

Taro 在 3.1 版本提出了开放式架构的思想，让开发者可以通过编写插件来支持一个新的平台，具体文档在 [这里](https://taro-docs.jd.com/taro/blog/2021-03-10-taro-3-1-lts#1-%E5%BC%80%E6%94%BE%E5%BC%8F%E6%9E%B6%E6%9E%84)。

该项目就是通过编写 Taro 插件，将 React 生态中知名框架 Next.js 作为 Taro 的一个目标平台，以此让 Taro 能够支持 Pre-rendering、SSR 和 ISR。

插件的工作可以分为两个主要阶段：生成 Next.js 项目和适配 Taro 项目代码。

### 生成 Next.js 项目

首先会在 `outputRoot` 目录下生成一个完整的 Next.js 项目，该过程中依赖的项目模板在 `nextjs/template` 目录下。

接着将 `sourceRoot` 目录下开发的 Taro 项目代码复制到 Next.js 项目的 `src` 目录下。这个过程除了会根据文件的 [端类型](https://docs.taro.zone/docs/envs#%E7%BB%9F%E4%B8%80%E6%8E%A5%E5%8F%A3%E7%9A%84%E5%A4%9A%E7%AB%AF%E6%96%87%E4%BB%B6) 后缀来挑选文件外，不会对代码文件进行任何处理。

最后根据 Taro 的全局配置文件 `app.config.js` 中的 `pages` 和 `subPackages` 配置项，来生成 Next.js 项目的路由，即 Next.js 的 `pages` 目录。

### 适配 Taro 代码
