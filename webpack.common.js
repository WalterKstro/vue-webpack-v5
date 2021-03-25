const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { VueLoaderPlugin } = require("vue-loader");

module.exports = {
  entry: "./src/index.js",
  resolve: {
    alias: {
      vue$: "vue/dist/vue.esm.js",
    },
  },
  optimization: {
    // splitChunks : {
    //   chunks : 'all'
    // }
    runtimeChunk: "single",
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: [{ loader: "babel-loader" }],
      },
      {
        test: /\.(png|jpg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: "css/[name].[contenthash].css",
    }),
    new HtmlWebpackPlugin({
      title: "Webpack desde cero",
      template: "./src/index.html",
    }),
  ],
};
