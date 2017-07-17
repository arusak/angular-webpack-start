const webpack = require('webpack');
const merge = require('webpack-merge');

const utils = require('./webpack.utils');
const paths = utils.paths;

let stagingConfig = require('./webpack.staging');
let prodConfig = {
  devtool: 'source-map',

  module: {
    rules: []
  },

  plugins: [
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
  ],
};

module.exports = merge(stagingConfig, prodConfig);
