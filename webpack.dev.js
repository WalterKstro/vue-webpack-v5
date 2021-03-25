const {merge} = require('webpack-merge')
const commond = require('./webpack.common')
const path = require("path");

module.exports = merge(commond, {
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[hash].bundle.js",
    clean: true
  },
  mode: 'development',
    devtool: 'eval-source-map',
  devServer: {
    contentBase: './dist',
    clientLogLevel: 'info',
    overlay: {
      warnings: true,
      errors: true
    }
    // hot: true
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: ['vue-style-loader','css-loader',
          {
            loader : 'sass-loader',
            options : {
              additionalData: '@import "./src/scss/variants.scss";'
            }
          }
        ]
      }
    ]
  }
})