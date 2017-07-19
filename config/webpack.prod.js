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
    // https://webpack.js.org/plugins/no-emit-on-errors-plugin/
    // Only emit files when there are no errors
    new webpack.NoEmitOnErrorsPlugin(),

    // Babel based minification
    // https://webpack.js.org/plugins/babili-webpack-plugin/
    new BabiliPlugin()
  ],
};

module.exports = merge(stagingConfig, prodConfig);
