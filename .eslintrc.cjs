module.exports = {
	root: true,
	parser: '@babel/eslint-parser',
	parserOptions: {
		babelOptions: {
			plugins: [],
		},
		ecmaVersion: 2018,
		requireConfigFile: false,
		sourceType: 'module',
	},
	extends: ['eslint:recommended', 'plugin:prettier/recommended', 'plugin:astro/recommended'],
	plugins: ['prettier'],
	env: {
		node: true,
		'astro/astro': true,
		es2020: true,
	},
	rules: {
		'prettier/prettier': 'error',
		'arrow-body-style': 'off',
		'prefer-arrow-callback': 'off',
	},
	overrides: [
		{
			files: ['*.astro'],
			env: {
				node: true,
				'astro/astro': true,
				es2020: true,
			},
			parser: 'astro-eslint-parser',
			parserOptions: {
				parser: '@typescript-eslint/parser',
				extraFileExtensions: ['.astro'],
				sourceType: 'module',
			},
			rules: {},
		},
		// ...
	],
};
