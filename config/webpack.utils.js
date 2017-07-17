const path = require('path');

module.exports = {
  paths: {
    src: path.join(__dirname, '..', 'src'),
    dest: path.join(__dirname, '..', 'build')
  },

  getBuildProfile() {
    return process.env.npm_lifecycle_event === 'bundle' ? 'production' : 'development';
  },

  getWebAppPrefix() {
    return process.env.webAppPrefix || '/';
  },

};
