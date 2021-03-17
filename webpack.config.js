const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: "./src/js/index.js",
  devtool: 'inline-source-map',
  mode: 'development',
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
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: [{loader: 'babel-loader'}]
      },
      {
        test: /\.css$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: 'css-loader' }
        ]
      },
      {
        test: /\.(png|jpg|gif)$/i,
        type: 'asset/resource'
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      title: "Webpack desde cero",
      template: "./src/index.html",
    }),
  ],
};
