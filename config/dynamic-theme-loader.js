const fs = require('fs');
const loaderUtils = require('loader-utils');

module.exports = function (mainData) {
  const loader = this;
  const options = loaderUtils.getOptions(this);
  const themeNames = options.themes && options.themes.split(',');

  if (Array.isArray(themeNames)) {
    const callback = this.async();
    const q = [];

    themeNames.forEach(themeName => {
      const themeAssetPath = this.resourcePath.replace(/\.([^\.]*)$/, `.${themeName}.$1`);
      loader.addDependency(themeAssetPath);

      q.push(new Promise((resolve, reject) => {
        fs.readFile(themeAssetPath, 'utf8', (err, themeData) => {
          if (!err) {
            resolve(themeData);
          } else if (err.code === 'ENOENT') {
            // don't worry! if it's not here then it's not needed
            resolve('');
          } else {
            reject(err);
          }
        });
      }));
    });

    Promise.all(q)
      .then(values => {
        const result = mainData + '\n' + values.join('\n');
        callback(null, result);
      }).catch(reason => console.log(reason));

  } else {
    return mainData;
  }
};
