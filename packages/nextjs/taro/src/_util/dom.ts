export function createInput(sourceType: string[]): HTMLInputElement {
    const el = document.createElement('input')
    el.setAttribute('type', 'file')
    // 仅能限制只通过相机拍摄，不能限制只允许从相册选择
    if (sourceType.length === 1 && sourceType[0] === 'camera') {
        el.setAttribute('capture', 'environment')
    }
    el.setAttribute('style', 'position: fixed; top: -4000px; left: -3000px; z-index: -300;')
    document.body.appendChild(el)
    return el
}
