const path = require('path');

module.exports = {
  paths: {
    root: process.cwd(),
    src: path.join(process.cwd(), 'src'),
    dest: path.join(process.cwd(), 'build')
  },

  getBuildProfile() {
    let profile = 'development';

    // set by maven in npm call
    if (process.env.npm_lifecycle_event === 'bundle') {
      // set by maven
      if (process.env.NODE_ENV === 'production') {
        profile = 'production';
      } else if (process.env.NODE_ENV === 'staging') {
        profile = 'staging';
      }
    }

    return profile;
  },

  getWebAppPrefix() {
    // set by maven
    return process.env.WEBAPP_PREFIX || '/';
  },

};
