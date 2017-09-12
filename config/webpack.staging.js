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

  devtool: 'cheap-module-source-map',

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

      // глобальные стили в отдельном файле
      {
        test: /\.css$/,
        include: path.join(paths.src, 'styles'),
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {importLoaders: 1},
            },
            {
              loader: 'postcss-loader',
              options: {
                config: {
                  path: path.join(paths.config, 'postcss.config.js')
                }
              }
            }
          ]
        })
      },
    ]
  },

  plugins: [
    new AotPlugin({
      tsConfigPath: path.join(paths.root, 'tsconfig.aot.json'),
      entryModule: path.join(paths.src, 'app' , 'app.module#AppModule')
    }),

    // Extract text from a bundle, or bundles, into a separate file.
    // https://webpack.js.org/plugins/extract-text-webpack-plugin/
    new ExtractTextPlugin('[name].[hash].css'),
  ],
};

module.exports = merge(commonConfig, stagingConfig);
