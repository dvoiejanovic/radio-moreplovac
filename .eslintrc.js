
/* eslint-env node */

const OFF = 0;
// const WARN = 1;
const ERR = 2;

module.exports = {
    'env': {
        'browser': true,
        'es2021': true
    },
    'extends': [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended'
    ],
    'overrides': [
    ],
    'parser': '@typescript-eslint/parser',
    'parserOptions': {
        'ecmaVersion': 'latest',
        'sourceType': 'module'
    },
    'plugins': [
        'react',
        '@typescript-eslint'
    ],
    'rules': {
        'quotes': [ERR, 'single'],
        'react/react-in-jsx-scope': OFF,
        'no-console': ERR,
        'no-multi-spaces': ERR,
        '@typescript-eslint/consistent-type-imports': [
            ERR, {
            prefer: 'type-imports',
            disallowTypeAnnotations: true,
            },
        ],
    }
}
