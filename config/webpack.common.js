const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
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

  // this is needed to use custom loaders
  resolveLoader: {
    modules: [
      paths.libs,
      paths.config
    ]
  },

  module: {
    rules: [
      // component styles
      {
        test: /\.css$/,
        include: path.join(paths.src, 'app'),
        use: [
          'raw-loader',
          // process with postcss
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: path.join(paths.config, 'postcss.config.js')
              }
            }
          },
          // search for a themed one and append it to main file if found
          {
            loader: 'theme-loader',
            options: {
              theme: process.env.THEME,
              mode: 'concat'
            }
          }
        ]
      },

      // styles of dependency modules — import as is
      {
        test: /\.css$/,
        include: path.join(paths.libs),
        use: 'raw-loader'
      },

      // angular templates — search for a themed one and use it if found
      {
        test: /\.html$/,
        use: ['raw-loader',
          {
            loader: 'theme-loader',
            options: {
              theme: process.env.THEME,
              mode: 'replace'
            }
          }
        ]
      }
    ]
  },


  plugins: [
    // remove old build
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
