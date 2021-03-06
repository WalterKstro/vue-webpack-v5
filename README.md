# Webpack v5 2021
##  Setting[ Webpack](https://webpack.js.org/concepts/configuration/ " Webpack")
As of version 4, webpack doesn't require any configuration
### Simple setting (webpack.config.js)
		const path = require('path');
		module.exports = {
		  mode: 'development',
		  entry: './index.js',
		  output: {
			path: path.resolve(__dirname, 'dist'),
			filename: 'index.bundle.js',
		  }
		};
## Mode Watch
Wbpack can watch files and recompile whenever they change
For enabled this option in file config of webpack set next option in the object of config or flag in the scripts of the file package.json
`watch: true,`
## Loaders
Webpack enables use of loaders to preprocess files
- **~~file-loader~~:** DEPRECATED for v5: please consider migrating to [asset modules](https://webpack.js.org/guides/asset-modules/ "asset modules")
```javascript
	{
	/*Using assets module*/
        test: /\.jpg/,
        type: 'asset/resource'
      }
```
- **[css-loader](https://webpack.js.org/loaders/css-loader/) :** The css-loader interprets @import and url() like import/require() and will resolve them.	
```
npm install --save-dev css-loader 
```
webpack.config.js
```
	{
		test: /\.css$/i,
		use: ["css-loader"],
	}
```
## Plugins
Plugins are the backbone of webpack. They also serve the purpose of doing anything else that a loader cannot do.
tip
- **[HtmlWebpackPlugin](https://github.com/jantimon/html-webpack-plugin#options)**
The HtmlWebpackPlugin simplifies creation of HTML files to serve your webpack bundles. The plugin will generate an HTML5 file for you that includes all your webpack bundles in the body using script tags
```
npm install --save-dev html-webpack-plugin
```
For working css separate file to use loader MiniCssExtractPlugin. 
- **[MiniCssExtractPlugin](https://webpack.js.org/plugins/mini-css-extract-plugin/) :** This plugin extracts CSS into separate files
```
npm install --save-dev mini-css-extract-plugin
```
webpack.config.js file
```
	{
		test: /\.css$/i,
		use: [MiniCssExtractPlugin.loader],
	}
```
- **[HtmlWebpackPlugin](https://webpack.js.org/plugins/html-webpack-plugin/) :** The HtmlWebpackPlugin simplifies creation of HTML files to serve your webpack bundles
```
npm install --save-dev html-webpack-plugin
```
webpack.config.js file
```
plugins: [new HtmlWebpackPlugin()]
```
## Environment
To disambiguate in your webpack.config.js between development and production builds you may use environment variables.
tip
There is one change that you will have to make to your webpack config. Typically, module.exports points to the configuration object. To use the env variable, you must convert module.exports to a ``function`` and return a object
```
"dev": "webpack --mode=development",
"build": "webpack --mode=production",
```
## Adding Vue
```
npm install --save-dev vue
```
webpack.config.js add resolve, for get full version of vue (Runtime+Compiler)
```
resolve : {
	alias : {
		'vue$' : 'vue/dist/vue.esm.js'
	}
}
```
import vue.js in the entry of webpack
```
import Vue from 'vue'
```
## [Code Splitting](https://webpack.js.org/guides/code-splitting/)
Code splitting is one of the most compelling features of webpack. This feature allows you to split your code into various bundles which can then be loaded on demand or in parallel.
If used correctly, can have a major impact on load time.

- **[SplitChunksPlugin](https://webpack.js.org/plugins/split-chunks-plugin/) :**
The SplitChunksPlugin allows us to extract common dependencies into an existing entry chunk or an entirely new chunk

webpack.config.js

```
module.exports = {
//...
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
};
```
### Dynamic Imports for Chunks
Before we start, let's remove the extra entry and optimization.splitChunks from our configuration

For optimization the bundle we can separate the bundle in chunks, for this we need change the import of componentes in the Single File Componentes
	
	/*Delete*/
	import Navigaitor from './components/Navigaitor.vue'
	import Slider from './components/Slider.vue'}

	/*New*/
	components : {
		Navigaitor : () => import('./components/Navigaitor.vue'),
		Slider : () => import('./components/Slider.vue')
	}

NOTE: We can rename the chunks adding a Magic Comments on the import
 	
	 Navigaitor : () => import(/* webpackChunkName: "my-chunk-name" */ './components/Navigaitor.vue'),



## Babel is a JavaScript compiler.

```
npm install -D babel-loader @babel/core @babel/preset-env @babel/plugin-syntax-dynamic-import
```
webpack.config.js
```
	{
		test: /\.js$/,
		exclude: /(node_modules|bower_components)/,
		use: [{loader: 'babel-loader'}]
	}
```
File in the root .babelrc
```
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "modules": false,
        "targets": "> 0.25%, not dead"
      }
    ]
  ],
  "plugins": ["@babel/plugin-transform-runtime", "@babel/plugin-syntax-dynamic-import"]
}
```

## Webpack dev server
The webpack-dev-server provides you with a simple web server and the ability to use live reloading. For default webpack-dev-server create a full refresh in the complete page, loss the state of page
```
npm install --save-dev webpack-dev-server
```
webpack.config.js
```
devServer: {
	contentBase: './dist',
}
```
and scripts in file package.json
```
"serve": "webpack serve --open"
```
## Hot	Module Replacement (HMR)
This feature is great for productivity.Enabling HMR is easy and in most cases no options are necessary. 
You should not use HotModuleReplacementPlugin plugin if you are using a webpack-dev-server.
Only we need add the key hot with value true in the object `devServer`
But this isn't completed, We need add these configuration in the index.js
```
if (module.hot) {
  module.hot.accept();
}
```

**Note:** HMR is automatically supported in webpack 5. No need to configure it

## Cleaning up the /dist folder
In general it's good practice to clean the /dist folder before each build
Add the option `clean: true` in the object output for enabled the clean of folder dist before build

## Vue Loader(Single File Components)
**[vue-loader](https://vue-loader.vuejs.org/)** is a loader for webpack that allows you to author Vue components in a format called Single-File Components (SFCs)
If you are not interested in manually setting up webpack, it is recommended to scaffold a project with Vue CLI

	<template>
		<div class="example">{{ msg }}</div>
	</template>

	<script>
	export default {
		data () {
			return {
				msg: 'Hello world!'
			}
		}
	}
	</script>

	<style>
	.example {
		color: red;
	}
	</style>


### Manual Setup
	npm install -D vue-loader vue-template-compiler

After of installed the loader. You have to create the structure similary of vue cli in your project

### webpack Configuration
	const { VueLoaderPlugin } = require('vue-loader')

	rules: [
		{
			test: /\.vue$/,
			loader: 'vue-loader'
		}
	]
	plugins: [
			// make sure to include the plugin!
			new VueLoaderPlugin()
	]

### CSS Extraction in Single File Components
You need install a loader vue-style-loader and modify the rule of css in the array rules in webpack.config.js

	npm install --save-dev vue-style-loader

webpack Configuration

	{
		test: /\.css$/,
		use: [
			argv.mode !== 'production'
				? 'vue-style-loader'
				: MiniCssExtractPlugin.loader,
			'css-loader'
		]
	}

## Using Pre-Processors
In webpack, all pre-processors need to be applied with a corresponding loader. vue-loader allows you to use other webpack loaders to process a part of a Vue component
### Sass
	npm install -D sass-loader node-sass

In your webpack config:

	// this will apply to both plain `.scss` files
	// AND `<style lang="scss">` blocks in `.vue` files
	{
		test: /\.scss$/,
		use: [
			'vue-style-loader',
			'css-loader',
			'sass-loader'
		]
	}


### Sharing Global Variables
`sass-loader` also supports a additionalData option which allows you to share common variables among all processed files without having to explicit import them

	// webpack.config.js -> module.rules
	{
		test: /\.scss$/,
		use: [
			'vue-style-loader',
			'css-loader',
			{
				loader: 'sass-loader',
				options: {
					'@import "./src/scss/variants.scss";'
				}
			}
		]
	}

## ESLint
Official ESLint plugin for Vue.js.

This plugin allows us to check the `<template>` and `<script>` of .vue files with ESLint, as well as Vue code in .js files.

	npm install --save-dev eslint eslint-plugin-vue

For enabled ESLint we need create a new scripts in the package.json

	"lint": "eslint --ext .js,.vue src"
We too can automation the fix the bugs in our code, adding the flag --fix

	"fix": "eslint --ext .js,.vue src --fix"
Config file .eslinttrc.js

	module.exports = {
		extends: [
			'plugin:vue/essential',
			'plugin:vue/vue3-recommended',
			'eslint:recommended'
		],
		rules: {}
	}
### ESLint y Babel
babel-eslint is now @babel/eslint-parser. This package will no longer receive updates.

	npm install @babel/eslint-parser --save-dev

Config file .eslinttrc.js

	parser: "@babel/eslint-parser",
	parserOptions: {
		sourceType: "module",
	},

## Merge Webpack and ESLint
Another option is using eslint-loader so that your *.vue files are automatically linted on save during development

	npm install -D eslint eslint-loader

Webpack file webpack.config.js

	module.exports = {
		// ... other options
		module: {
			rules: [
				{
					enforce: 'pre',
					test: /\.(js|vue)$/,
					loader: 'eslint-loader',
					exclude: /node_modules/
				}
			]
		}
	}

We too, we can view the error and warning messages, in the browser and in the termimal

	/* Webpack config */
	
	devServer: {
		contentBase: './dist',
		clientLogLevel: 'info',
		overlay: {
			warnings: true,
			errors: true
		}
		// hot: true
	},

## Create diferents environments of production and development
The goals of development and production builds differ greatly. In development, we want strong source mapping and a localhost server with live reloading or hot module replacement. In production, our goals shift to a focus on minified bundles, lighter weight source maps, and optimized assets to improve load time. With this logical separation at hand, we typically recommend writing separate webpack configurations for each environment.

- webpack.common.js
- webpack.dev.js
- webpack.prod.js


### Webpack Merge
While we will separate the production and development specific bits out, note that we'll still maintain a "common" configuration to keep things DRY. In order to merge these configurations together, we'll use a utility called webpack-merge

	npm install --save-dev webpack-merge

`NOTE:` In this step we need delete the file webpack.config.js general

### NPM Scripts

In the file package.json we need update with these scripts with the flag --config and their file seleccioned

	scripts : {
		"build": "webpack --config webpack.prod.js",
		"serve": "webpack serve --open --config webpack.dev.js",
	}