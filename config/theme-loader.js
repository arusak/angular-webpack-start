const fs = require('fs');
const loaderUtils = require('loader-utils');

module.exports = function (mainData) {
  const options = loaderUtils.getOptions(this);
  let themeName = options.theme;
  let mode = options.mode;

  if (themeName) {
    if (!Object.keys(transform).includes(mode)) {
      mode = 'replace';
    }

    const themeAssetPath = this.resourcePath.replace(/\.([^\.]*)$/, `.${themeName}.$1`);
    const callback = this.async();

    this.addDependency(themeAssetPath);

    fs.readFile(themeAssetPath, 'utf8', (err, themeData) => {
      if (!err) {
        callback(null, transform[mode](mainData, themeData));
      } else if (err.code === 'ENOENT') {
        // don't worry! if it's not here then it's not needed
        callback(null, mainData);
      } else {
        callback(err);
      }
    });
  } else {
    return mainData;
  }
};

const transform = {
  concat: (mainData, themeData) => mainData + '\n' + themeData,
  replace: (mainData, themeData) => themeData
};

