const webpack = require('webpack');
const utils = require('./webpack.utils');

module.exports = {
  devtool: 'inline-source-map',

  resolve: {
    extensions: ['.ts', '.js']
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
    ],
  },

  plugins: [
    // Workaround for angular/angular#11580
    new webpack.ContextReplacementPlugin(
      /angular(\\|\/)core(\\|\/)@angular/,
      utils.paths.src,
      {} // a map of your routes
    ),

    new webpack.DefinePlugin({
      WEBAPP_PREFIX: JSON.stringify(utils.getWebAppPrefix()),
      BUILD_PROFILE: JSON.stringify(utils.getBuildProfile()),
    }),
  ],

  watch: true
};

