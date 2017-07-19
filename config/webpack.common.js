const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

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
      // стили компонентов
      {
        test: /\.css$/,
        include: path.join(paths.src, 'app'),
        use: [
          'raw-loader',
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: path.join(paths.config, 'postcss.config.js')
              }
            }
          }
        ]
      },

      // стили библиотечных компонентов
      {
        test: /\.css$/,
        include: path.join(paths.libs),
        use: 'raw-loader'
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
      {
        test: /\.html$/,
        use: 'raw-loader'
      }
    ]
  },


  plugins: [
    new CleanWebpackPlugin([paths.dest], {root: paths.root}),

    // Workaround for angular/angular#11580
    new webpack.ContextReplacementPlugin(
      /angular(\\|\/)core(\\|\/)@angular/,
      paths.src,
      {} // a map of your routes
    ),

    // @see https://github.com/moment/moment/issues/1435#issuecomment-249773545
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /ru/),

    // Create global constants which can be configured at compile time
    // https://webpack.js.org/plugins/define-plugin/
    new webpack.DefinePlugin({
      WEBAPP_PREFIX: JSON.stringify(utils.getWebAppPrefix()),
      BUILD_PROFILE: JSON.stringify(utils.getBuildProfile()),
    }),

    // Extract common modules shared between chunks
    // https://webpack.js.org/plugins/commons-chunk-plugin/
    new webpack.optimize.CommonsChunkPlugin({
      names: ['app', 'vendor', 'polyfills']
    }),

    // Create HTML files to serve your webpack bundles
    // https://github.com/jantimon/html-webpack-plugin
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),

    // скопировать шрифты, картинки, звуки
    // используется в паре с WriteFilePlugin для работы с webpack-dev-server
    new CopyWebpackPlugin([{
      from: path.join(paths.src, 'assets'),
      to: path.join(paths.dest, 'assets')
    }]),
    new WriteFilePlugin(),

    // https://github.com/th0r/webpack-bundle-analyzer
    new BundleAnalyzerPlugin({
      analyzerPort: 8484,
      openAnalyzer: true,
      analyzerMode: utils.getAnalyzerMode()
    })
  ],
};

module.exports = commonConfig;
