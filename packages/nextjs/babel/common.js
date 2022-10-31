const regexCssGlobal = /(?<!\.module)\.css$/

const regexSassGlobal = /(?<!\.module)\.(scss|sass)$/

const regexLessGlobal = /(?<!\.module)\.less$/

exports.isGlobalStyle = function isGlobalStyle(request) {
    return [regexCssGlobal, regexSassGlobal, regexLessGlobal].some(regex => regex.test(request))
}
