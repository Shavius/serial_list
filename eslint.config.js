const globals = require("globals");
const pluginJs = require("@eslint/js");
const tseslint = require("typescript-eslint");
const tsParser = require("@typescript-eslint/parser");
const prettierPlugin = require("eslint-plugin-prettier");

const languageOptions = {
	globals: {
		...globals.node,
		...globals.browser,
	},
	ecmaVersion: "latest",
	sourceType: "module",
	parser: tsParser,
};

const pluginsOptions = {
	"import/parsers": tsParser,
	prettier: prettierPlugin,
};

module.exports = [
	{ files: ["**/*.{js,mjs,cjs,ts}"] },
	{ ignores: ["**/node_modules", "**/dist", "**/coverage", "webpack.config.js", "eslint.config.js"] },
	{
		plugins: {
			...pluginsOptions,
		},
	},
	{
		languageOptions: {
			...languageOptions,
		},
	},
	pluginJs.configs.recommended,
	...tseslint.configs.recommended,
	{
		rules: {
			"@typescript-eslint/explicit-function-return-type": [
				"error",
				{
					allowExpressions: false,
					allowTypedFunctionExpressions: true,
					allowHigherOrderFunctions: false,
					allowDirectConstAssertionInArrowFunctions: false,
					allowConciseArrowFunctionExpressionsStartingWithVoid: false,
				},
			],
			"no-console": "off",
		},
	},
];
