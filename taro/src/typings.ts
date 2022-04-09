export interface TaroRouter<T extends Record<string, string> = Record<string, string>> {
    /**
     * 路由参数。
     */
    params: T

    /**
     * 页面路径。
     */
    path: string
}
