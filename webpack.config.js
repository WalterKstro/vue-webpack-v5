const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { VueLoaderPlugin } = require('vue-loader')

module.exports = (argv) => {
  return {
    entry: "./src/index.js",
    mode: argv.mode,
    devtool: argv.mode === 'development' ? 'eval-source-map' : 'source-map',
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "[name].[fullhash].bundle.js",
      clean: true
    },
    resolve : {
      alias : {
        'vue$' : 'vue/dist/vue.esm.js'
      }
    },
    optimization : {
      splitChunks : {
        chunks : 'all'
      }
    },
    devServer: {
      contentBase: './dist'
      // hot: true
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader'
        },
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          use: [{loader: 'babel-loader'}]
        },
        {
          test: /\.scss$/,
          use: [
            argv.mode !== 'production'
            ? 'vue-style-loader'
            :  MiniCssExtractPlugin.loader,
            'css-loader',
            {
              loader : 'sass-loader',
              options : {
                  additionalData: '@import "./src/scss/variants.scss";'
              }
            }
          ]
        },
        {
          test: /\.(png|jpg|gif)$/i,
          type: 'asset/resource'
        }
      ]
    },
    plugins: [
      new VueLoaderPlugin(),
      new MiniCssExtractPlugin(),
      new HtmlWebpackPlugin({
        title: "Webpack desde cero",
        template: "./src/index.html",
      }),
    ]
  }
};
