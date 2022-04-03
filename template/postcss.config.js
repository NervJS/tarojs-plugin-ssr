module.exports = {
    plugins: [
        ['postcss-pxtorem', {
            rootValue: 20 / 320 * 414 * 3,
            propWhiteList: []
        }]
    ]
}