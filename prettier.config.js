/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */
const config = {
    $schema: 'https://json.schemastore.org/prettierrc',
    semi: true,
    singleQuote: true,
    printWidth: 100,
    trailingComma: 'all',
    tabWidth: 4,
    useTabs: true,
    arrowParens: 'always',
    vueIndentScriptAndStyle: false,
    bracketSameLine: false,
    endOfLine: 'lf',
    singleAttributePerLine: true,
}

export default config;