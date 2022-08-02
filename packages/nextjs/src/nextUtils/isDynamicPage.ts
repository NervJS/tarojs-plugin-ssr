export function isDynamicPage(str: string): boolean {
    return str.startsWith('[') && str.endsWith(']')
}
