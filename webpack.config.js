// const validate = require('webpack-validator')
// module.exports = validate(require('./config/webpack.dev.js'), {
//   quiet: true
// });


const webpack = require('webpack');
const path = require('path');
var helpers = require('./config/helpers');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = {
  entry: {
    'polyfills': './src/polyfills.ts',
    'vendor': './src/vendors.ts',
    'app': './src/main.ts'
  },
  output: {
    path: helpers.root('dist'),
    publicPath: '/',
    filename: '[name].[hash].js',
    chunkFilename: '[id].[hash].chunk.js'
  },
  resolve: {
    extensions: ['.ts', '.js', '.json']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loaders: ['awesome-typescript-loader', 'angular2-template-loader']
      },
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.html/, loader: 'html-loader?minimize=false' },
      { test: /\.styl$/, loader: 'css-loader!stylus-loader' },
      { test: /\.css$/, loader: ExtractTextPlugin.extract(["style-loader", "css-loader"]) },
      { test: /\.(gif|png|jpe?g)$/i, loader: 'file-loader?name=dist/images/[name].[ext]' },
      { test: /\.woff2?$/, loader: 'url-loader?name=dist/fonts/[name].[ext]&limit=10000&mimetype=application/font-woff' },
      { test: /\.(ttf|eot|svg)$/, loader: 'file-loader?name=dist/fonts/[name].[ext]' }
    ]
  },
  plugins: [
    // Fixes Angular 2 error
    new webpack.ContextReplacementPlugin(
      /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
      __dirname
    ),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      minify: false
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendors', 'polyfills', 'app']
    })
  ]
};

if (!(process.env.WEBPACK_ENV === 'production')) {
  config.devtool = 'source-map';
  config.plugins = config.plugins.concat([
    new webpack.DefinePlugin({
      'WEBPACK_ENV': '"dev"'
    })
  ])
} else {
  config.devtool = 'hidden-source-map';
  config.plugins = config.plugins.concat([
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: true,
        warnings: false
      },
      comments: false,
      sourceMap: true
    }),
    new webpack.DefinePlugin({
      'WEBPACK_ENV': '"production"'
    }),
    new ExtractTextPlugin('[name].[hash].css')
    //,
    //new CopyWebpackPlugin([{ from: './src/index.html' }], {})
  ]);
}

module.exports = config;