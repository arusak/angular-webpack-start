const webpack = require('webpack');
const merge = require('webpack-merge');
const BabiliPlugin = require("babili-webpack-plugin");

const utils = require('./webpack.utils');
const paths = utils.paths;

let stagingConfig = require('./webpack.staging');
let prodConfig = {
  devtool: 'nosources-source-map',

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

    new BabiliPlugin()
  ],
};

module.exports = merge(stagingConfig, prodConfig);
