const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');

const utils = require('./webpack.utils');
const paths = utils.paths;

let commonConfig = {
  context: path.join(process.cwd()),

  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      // @see https://github.com/moment/moment/issues/1435#issuecomment-249773545
      moment: 'moment/moment'
    },
  },

  module: {
    rules: [
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

      // стили компонентов
      {
        test: /\.css$/,
        include: path.join(paths.src, 'app'),
        use: [
          'raw-loader',
          // 'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: path.join(__dirname, 'config', 'postcss.config.js')
              }
            }
          }
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
                  path: path.join(__dirname, 'config', 'postcss.config.js')
                }
              }
            }
          ]
        })
      },
      {
        test: /\.html$/,
        use: 'raw-loader'
      }
    ]
  },


  plugins: [
    new CleanWebpackPlugin([paths.dest]),

    // Workaround for angular/angular#11580
    new webpack.ContextReplacementPlugin(
      /angular(\\|\/)core(\\|\/)@angular/,
      paths.src,
      {} // a map of your routes
    ),

    new webpack.DefinePlugin({
      WEBAPP_PREFIX: JSON.stringify(utils.getWebAppPrefix()),
      BUILD_PROFILE: JSON.stringify(utils.getBuildProfile()),
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'vendor', 'polyfills']
    }),

    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),

    // @see https://github.com/moment/moment/issues/1435#issuecomment-249773545
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /ru/),

    new ExtractTextPlugin('[name].bundle.css'),

    // скопировать шрифты, картинки, звуки
    // используется в паре с WriteFilePlugin для работы с webpack-dev-server
    new CopyWebpackPlugin([{
      from: path.join(paths.src, 'assets'),
      to: path.join(paths.dest, 'assets')
    }]),
    new WriteFilePlugin(),
  ],
};

module.exports = commonConfig;
