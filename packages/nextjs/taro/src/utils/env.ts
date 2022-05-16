export function isAndroid() {
    const {userAgent} = window.navigator
    return /(Android);?[\s\/]+([\d.]+)?|Baidu;.*P1/.test(userAgent)
}
