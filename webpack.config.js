const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  entry: './src/main.js',
  devtool: 'source-map',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    contentBase: './dist',
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },
  plugins: [
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),
    new webpack.DefinePlugin({
      __DEV__: "true",
      __TEST__: "true",
      __VERSION__: JSON.stringify('0.1.1'),
      __BROWSER__: "false",
      __GLOBAL__: "false",
      __ESM_BUNDLER__: "true",
      __ESM_BROWSER__: "false",
      __NODE_JS__: "true",
      __FEATURE_OPTIONS_API__: "true",
      __FEATURE_SUSPENSE__: "true",
      __FEATURE_PROD_DEVTOOLS__: "true"
    })
  ],
  module: {
    rules: [
      { test: /\.tsx?$/, loader: "ts-loader" }
    ]
  }
};