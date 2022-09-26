module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended'
    ],
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 'latest'
    },
    plugins: [
        'react'
    ],
    rules: {
        'comma-dangle': 'error',
        quotes: ['error', 'single'],
        semi: ['error', 'never'],
        'quote-props': ['error', 'as-needed'],
        'no-inner-declarations': 'off',
        'no-empty': 'off',
        'react/react-in-jsx-scope': 'off'
    },
    overrides: [
        {
            files: ['*.ts', '*.tsx'],
            parser: '@typescript-eslint/parser',
            extends: [
                'plugin:@typescript-eslint/recommended'
            ],
            plugins: [
                '@typescript-eslint'
            ],
            rules: {  
                '@typescript-eslint/no-empty-function': 'off',
                '@typescript-eslint/no-namespace': 'off',
                '@typescript-eslint/ban-types': 'off'
            }
        }
    ],
    ignorePatterns: [
        '**/lib/**/*.js',
        '**/lib/**/*.ts',
        '**/es/**/*.js',
        '**/es/**/*.ts',
        '**/dist/**/*.js',
        '**/dist/**/*.ts'
    ]
}
