const path = require('path');
const utils = require('./webpack.utils');
const paths = utils.paths;

module.exports = function getCssLoaders(params) {
  let loaders = [
    {
      loader: 'postcss-loader',
      options: {
        config: {
          path: path.join(paths.config, 'postcss.config.js')
        }
      }
    },
    {
      loader: 'dynamic-theme-loader',
      options: {
        themes: utils.getDynamicThemes()
      }
    },
    {
      loader: 'static-theme-loader',
      options: {
        theme: utils.getStaticTheme(),
        mode: 'concat'
      }
    }
  ];

  if (params && params.includeCssLoader) {
    loaders.unshift({
      loader: 'css-loader',
      options: {importLoaders: loaders.length},
    });
  }

  if (params && params.includeRawLoader) {
    loaders.unshift('raw-loader');
  }

  if (params && params.includeStyleLoader) {
    loaders.unshift('style-loader');
  }

  return loaders;
};
