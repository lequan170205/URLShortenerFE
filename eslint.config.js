// eslint.config.js
import { defineConfig } from 'eslint/config'
import globals from 'globals'
import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import prettier from 'eslint-config-prettier'

export default defineConfig([
  js.configs.recommended,
  ...pluginVue.configs['flat/recommended'], // cấu hình Vue cơ bản

  {
    files: ['**/*.{js,mjs,jsx,vue}'],
    ignores: ['dist/**', 'dist-ssr/**', 'coverage/**'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2021
      },
      ecmaVersion: 'latest',
      sourceType: 'module'
    },
    plugins: {
      vue: pluginVue
    },
    rules: {
      // --- Base JS rules ---
      'no-unused-vars': 'warn',
      'no-console': 'warn',
      'no-debugger': 'warn',

      // --- Vue rules ---
      'vue/multi-word-component-names': 'off',
      'vue/no-v-html': 'off',
      'vue/no-unknown-attribute': 'warn', // kiểm tra thuộc tính không hợp lệ

      // --- Formatting / Spacing rules ---
      'eol-last': ['warn', 'always'],
      'no-multiple-empty-lines': ['warn', { max: 1, maxEOF: 0 }],
      'padded-blocks': ['warn', 'never'],
      'object-curly-spacing': ['warn', 'always'],
      'array-bracket-spacing': ['warn', 'never'],
      'space-before-blocks': ['warn', 'always'],
      'keyword-spacing': ['warn', { before: true, after: true }],
      'space-infix-ops': ['warn'],
      indent: ['warn', 2, { SwitchCase: 1 }],
      'linebreak-style': ['warn', 'unix']
    }
  },

  // Disable ESLint rules that conflict with Prettier
  prettier
])
