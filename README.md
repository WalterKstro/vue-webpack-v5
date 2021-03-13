# Vue.js & Webpack v5
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