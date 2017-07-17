const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

const utils = require('./webpack.utils');
const paths = utils.paths;

let commonConfig = require('./webpack.common');
let stagingConfig = {
  entry: {
    polyfills: path.join(paths.src, 'polyfills.ts'),
    vendor: path.join(paths.src, 'vendor.aot.ts'),
    app: path.join(paths.src, 'main.aot.ts'),
  },

  devtool: 'source-map',

  output: {
    path: paths.dest,
    publicPath: utils.getWebAppPrefix(),
    filename: '[name].[hash].js',
    chunkFilename: '[id].[hash].chunk.js'
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'awesome-typescript-loader',
            options: {
              configFileName: 'tsconfig.aot.json'
            }
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

  plugins: [],
};

module.exports = merge(commonConfig, stagingConfig);
