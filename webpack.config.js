const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const dir = name => path.resolve(__dirname, name);
const SRC_PATH = dir('src');
const BUILD_PATH = dir('dist');

module.exports = {
  mode: 'development',
  entry: path.resolve(SRC_PATH, 'index.js'),
  output: {
    path: BUILD_PATH,
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {test: /\.pug$/, loader: 'pug-loader'},
      {
        test: /\.styl$/,
        use: [
          'style-loader',
          'css-loader',
          {loader: 'stylus-loader', options: {use: [require('nib')()]}}
        ]
      }
    ]
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.styl', '.js']
  },
  devServer: {
    host: '0.0.0.0',
    inline: true,
    progress: true,
    hot: true,
    historyApiFallback: true,
    stats: {
      chunkModules: false,
      colors: true
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(SRC_PATH, 'index.pug')
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
};
