const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

const devServerPort = 3000;
const apiPort = 8080;
const apiHost = 'localhost';

const utils = require('./webpack.utils');
const paths = utils.paths;

let commonConfig = require('./webpack.common');
let devConfig = {
  entry: {
    polyfills: path.join(paths.src, 'polyfills.ts'),
    vendor: path.join(paths.src, 'vendor.jit.ts'),
    app: path.join(paths.src, 'main.jit.ts'),
  },

  devtool: 'source-map',

  output: {
    path: paths.dest,
    publicPath: `http://localhost:${devServerPort}/`,
    filename: '[name].js',
    chunkFilename: '[id].chunk.js'
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        enforce: 'pre',
        loader: 'tslint-loader'
      },
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'awesome-typescript-loader',
            options: {}
          },
          {
            loader: 'angular-router-loader',
            options: {
              aot: true,
              genDir: 'aot/'
            }
          },
          'angular2-template-loader'
        ]
      },
    ]
  },

  plugins: [
    new webpack.NamedModulesPlugin(),

    new webpack.HotModuleReplacementPlugin(),
  ],

  devServer: {
    hot: true,
    // полный путь к статике
    contentBase: paths.dest,
    // полный урл нужен для работы HMR
    publicPath: `http://localhost:${devServerPort}/`,
    historyApiFallback: true,
    stats: 'normal',
    port: 3000,
    proxy: {
      '/api': {
        target: `http://${apiHost}:${apiPort}`,
        changeOrigin: true,
        logLevel: 'debug',
        onError: function () {
          console.log(arguments);
        }
      }
    }
  }
};

module.exports = merge(commonConfig, devConfig);
