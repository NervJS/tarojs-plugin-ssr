import {ensureLeadingSlash} from '../utils'

interface SubPackagesType {
    root: string
    pages: string[]
}

export function mergeTaroPages(pages?: string[], subPackages?: SubPackagesType): string[] {
    const taroPages: string[] = []
    if (Array.isArray(pages)) {
        for (const page of pages) {
            taroPages.push(ensureLeadingSlash(page))
        }
    }
    if (Array.isArray(subPackages)) {
        for (const pkg of subPackages) {
            if (Array.isArray(pkg.pages)) {
                for (const page of pkg.pages) {
                    taroPages.push(ensureLeadingSlash(`${pkg.root}/${page}`))
                }
            }
        }
    }
    return taroPages
}
