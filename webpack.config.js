const profile = require('./config/webpack.utils').getBuildProfile();

console.log(`Use profile: ${profile}`);
let config;

if (profile === 'production') {
  config = require('./config/webpack.prod');
} else if (profile === 'staging') {
  config = require('./config/webpack.staging');
} else {
  config = require('./config/webpack.dev');
}

// console.log(config.module.rules);

module.exports = config;
