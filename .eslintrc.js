module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended'
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 'latest'
    },
    plugins: [
        'react',
        '@typescript-eslint'
    ],
    rules: {
        'comma-dangle': 'error',
        quotes: ['error', 'single'],
        semi: ['error', 'never'],
        'quote-props': ['error', 'as-needed'],
        'no-inner-declarations': 'off',
        'no-empty': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        'react/react-in-jsx-scope': 'off'
    }
}
