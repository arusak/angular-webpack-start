const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');

const WEBAPP_PREFIX = process.env.webAppPrefix || '/';
const BUILD_PROFILE = process.env.npm_lifecycle_event === 'bundle' ? 'production' : 'development';

const config = {
  paths: {
    src: path.join(__dirname, 'src'),
    dest: path.join(__dirname, 'build')
  }
};
config.isProd = BUILD_PROFILE === 'production';
let staticAssetsTest= /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/;

let wpc = {
  entry: {
    polyfills: path.join(config.paths.src, 'polyfills.ts'),
    vendor: path.join(config.paths.src, 'vendor.ts'),
    app: path.join(config.paths.src, 'main.ts'),
  },

  resolve: {
    extensions: ['.ts', '.js']
  },

  //devtool: config.isProd ? 'source-map' : 'cheap-module-inline-source-map',
  devtool: 'source-map',

  output: {
    path: config.paths.dest,
    publicPath: config.isProd ? '/' : 'http://localhost:3000/',
    filename: config.isProd ? '[name].[hash].js' : '[name].js',
    chunkFilename: config.isProd ? '[id].[hash].chunk.js' : '[id].chunk.js'
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

      // линтование тайпскрипта
      {
        test: /\.ts$/,
        enforce: 'pre',
        loader: 'tslint-loader'
      },

      // {
      //   test: staticAssetsTest,
      //   use: 'file-loader'
      // },

      // стили компонентов
      {
        test: /\.css$/,
        include: path.join(config.paths.src, 'app'),
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
        include: path.join(config.paths.src, 'styles'),
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
    new CleanWebpackPlugin([config.paths.dest]),

    // Workaround for angular/angular#11580
    new webpack.ContextReplacementPlugin(
      /angular(\\|\/)core(\\|\/)@angular/,
      config.paths.src,
      {} // a map of your routes
    ),

    new webpack.DefinePlugin({
      WEBAPP_PREFIX: JSON.stringify(WEBAPP_PREFIX),
      BUILD_PROFILE: JSON.stringify(BUILD_PROFILE),
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'vendor', 'polyfills']
    }),

    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),

    new webpack.NamedModulesPlugin(),

    new webpack.HotModuleReplacementPlugin(),

    new ExtractTextPlugin('[name].bundle.css'),

    // скопировать шрифты, картинки, звуки
    // используется в паре с WriteFilePlugin для работы с webpack-dev-server
    new CopyWebpackPlugin([{
      from: path.join(config.paths.src, 'assets'),
      to: path.join(config.paths.dest, 'assets')
    }]),

    new WriteFilePlugin(),
  ],

  devServer: {
    hot: true,
    // полный путь к статике
    contentBase: config.paths.dest,
    // полный урл нужен для работы HMR
    publicPath: 'http://localhost:3000/',
    historyApiFallback: true,
    stats: 'normal',
    port: 3000,
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
        logLevel: 'debug',
        onError: function () {
          console.log(arguments);
        }
      }
    }
  }
};

// Add build specific plugins
if (config.isProd) {
  wpc.plugins.push(
    // Reference: http://webpack.github.io/docs/list-of-plugins.html#noerrorsplugin
    // Only emit files when there are no errors
    new webpack.NoEmitOnErrorsPlugin(),

    // // Reference: http://webpack.github.io/docs/list-of-plugins.html#dedupeplugin
    // // Dedupe modules in the output
    // new webpack.optimize.DedupePlugin(),

    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      mangle: {keep_fnames: true},
      comments: false,
      beautify: false,
      compress: {
        warnings: false,
        drop_console: false
      }
    })
  );
}

module.exports = wpc;
