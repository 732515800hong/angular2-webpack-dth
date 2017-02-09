const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const helpers = require('./helpers');

const ENV = process.env.NODE_ENV = process.env.ENV = 'development';

module.exports = webpackMerge(commonConfig, {
  devtool: 'cheap-module-source-map',

  output: {
    path: helpers.root('dist'),
    filename: '[name].js',
    sourceMapFilename: '[name].map',
    chunkFilename: '[id].chunk.js'
  },

  devServer: {
    port: 3020,
    host: '192.168.20.195',
    compress: true,
    historyApiFallback: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    },
    contentBase: helpers.root('dist'),
    // 将 node 服务转接到 4000 端口
    // 这样就可以同时获得 webpack-dev-server 的实时刷新
    // 也能同时调试接口
    proxy: {
      '/api': {
        target: 'http://localhost:4000'
      }
    }
  },

  plugins: [
    new webpack.LoaderOptionsPlugin({
      debug: true,
      options: {}
    })
  ]
});
