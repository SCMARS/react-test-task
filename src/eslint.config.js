import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default [
    // Global ESLint recommended rules
    {
        files: ['**/*.{ts,tsx,js,jsx}'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module',
            },
            globals: {
                // Define Node.js and ES6 environments
                node: true,
                es6: true,
            },
        },
        linterOptions: {
            reportUnusedDisableDirectives: true,
        },
    },

    // TypeScript-specific configuration
    {
        files: ['**/*.ts', '**/*.tsx'],
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                project: './tsconfig.json',
                ecmaVersion: 'latest',
                sourceType: 'module',
            },
        },
        plugins: {
            '@typescript-eslint': tsPlugin,
            'prettier': prettierPlugin,
        },
        rules: {
            // Merge rules from your existing configurations
            'no-unused-vars': 'off', // Turn off base rule
            '@typescript-eslint/no-unused-vars': ['warn'],
            'prettier/prettier': 'error',
            ...tsPlugin.configs.recommended.rules,
            ...prettierConfig.rules,
        },
    },
];