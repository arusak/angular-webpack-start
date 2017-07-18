const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

const AotPlugin = require('@ngtools/webpack').AotPlugin;
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const utils = require('./webpack.utils');
const paths = utils.paths;

let commonConfig = require('./webpack.common');
let stagingConfig = {
  entry: {
    polyfills: path.join(paths.src, 'polyfills.ts'),
    vendor: path.join(paths.src, 'vendor.aot.ts'),
    app: path.join(paths.src, 'main.ts'),
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
          '@ngtools/webpack'
        ]
      },
    ]
  },

  plugins: [
    new AotPlugin({
      tsConfigPath: path.join(paths.root, 'tsconfig.aot.json'),
      entryModule: path.join(paths.src, 'app' , 'app.module#AppModule')
    }),

    new ExtractTextPlugin('[name].[hash].css'),
  ],
};

module.exports = merge(commonConfig, stagingConfig);
