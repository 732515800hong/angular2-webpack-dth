const path = require('path');
const webpack = require('webpack');
const AssetsPlugin = require('assets-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const helpers = require('./helpers');

module.exports = {
  entry: {
    'polyfills': './src/polyfills.ts',
    'vendors': './src/vendors.ts',
    'app': './src/main.ts'
  },
  resolve: {
    extensions: [".ts", ".js", ".json"]
  },
  module: {
    rules: [
      {
        test: /.ts$/,
        use: [
          'awesome-typescript-loader',
          'angular2-template-loader',
          'angular-router-loader'
        ],
        exclude: [/\.(spec|e2e)\.ts$/]
      },
      {
        test: /.json$/,
        use: 'json-loader'
      },
      {
        test: /\.css$/,
        exclude: [helpers.root('node_modules')],
        use: ['to-string-loader', 'css-loader']
      },
      {
        test: /\.(sass|scss|css)$/,
        exclude: [helpers.root('src', 'app')],
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: ['css-loader?importLoaders=1', 'sass-loader?outputStyle=compressed&sourceComments=false']
        }),
      },
      {
        test: /\.(sass|scss)$/,
        include: helpers.root('src', 'app'),
        use: ['raw-loader', 'sass-loader?outputStyle=compressed&sourceComments=false']
      },
      {
        test: /.html$/,
        use: 'html-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        use: 'file-loader'
      }
    ]
  },
  plugins: [
    //new CheckerPlugin(),
    /**
     * 资源文件
     */
    new AssetsPlugin({
      path: helpers.root('dist'),
      filename: 'webpack-assets.json',
      prettyPrint: true
    }),
    new ExtractTextPlugin({
      filename: '[name].bundle.css',
      allChunks: false
    }),
    new webpack.ContextReplacementPlugin(
      /angular(\\|\/)core(\\|\/)src(\\|\/)linker/,
      helpers.root('src'), // location of your src
      {
        // your Angular Async Route paths relative to this root directory
      }
    ),
    new CopyWebpackPlugin([
      { from: 'src/assets', to: 'assets' }
    ]),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      minify: false
    }),
    new webpack.LoaderOptionsPlugin({}),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendors', 'polyfills']
    })
  ]
}