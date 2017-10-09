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
    app: path.join(paths.src, 'main.ts'),
  },

  devtool: 'cheap-module-source-map',

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
          'angular2-template-loader'
        ]
      },

      {
        test: /\.css$/,
        include: path.join(paths.src, 'styles'),
        use: require('./webpack.css-loaders')({includeCssLoader: true, includeStyleLoader: true})
      },
    ]
  },

  plugins: [
    // Will cause the relative path of the module to be displayed when HMR is enabled
    new webpack.NamedModulesPlugin(),

    // https://webpack.js.org/plugins/hot-module-replacement-plugin/
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
    port: devServerPort,
    proxy: {
      '/api': {
        target: `http://${apiHost}:${apiPort}`,
        changeOrigin: true,
        logLevel: 'debug',
        onError: function (err, req, res, url) {
          console.log(err);
        }
      }
    },
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    }
  }
};

module.exports = merge(commonConfig, devConfig);
