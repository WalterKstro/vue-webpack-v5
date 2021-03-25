const {merge} = require('webpack-merge')
const commond = require('./webpack.common')
const path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(commond, {
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/[name].[contenthash].bundle.js",
    assetModuleFilename: 'images/[contenthash][ext][query]',
    clean: true
  },
  mode: 'production',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader,'css-loader',
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