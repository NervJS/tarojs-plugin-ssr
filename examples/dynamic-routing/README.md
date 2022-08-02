# 动态路由示例

这个例子展示如何使用动态路由。它包含两个动态路由：

1. pages/post/[id]/index.tsx
    * 例如，匹配 /post?id=my-example
2. pages/comment/[id]/[comment].tsx
    * 例如，匹配 /comment?id=my-example&comment=a-comment

## 执行 Next.js

```bash
yarn dev:nextjs
```

## 执行小程序

```bash
yarn dev:swan
```
