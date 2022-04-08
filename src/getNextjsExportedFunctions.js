const babel = require('@babel/core')
const fs = require('fs')

const NEXT_EXPORT_FUNCTIONS = [
    'getStaticProps',
    'getStaticPaths',
    'getServerSideProps'
]

function getNextExportedFunctions(filename) {
    const code = fs.readFileSync(filename, 'utf-8')
    const ast = babel.parseSync(code, {filename})

    const result = []
    babel.traverse(ast, {
        ExportNamedDeclaration(path) {
            const declaration = path.get('declaration')
            if (declaration.isFunctionDeclaration()) {
                const name = declaration.node.id.name
                if (NEXT_EXPORT_FUNCTIONS.includes(name)) {
                    result.push(name)
                }
            }
            if (declaration.isVariableDeclaration()) {
                for (const declarator of declaration.node.declarations) {
                    const name = declarator.id.name
                    if (NEXT_EXPORT_FUNCTIONS.includes(name)) {
                        result.push(name)
                    }
                }
            }
        }
    })
    return result
}

module.exports = getNextExportedFunctions
