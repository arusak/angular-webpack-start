const profile = require('./config/webpack.utils').getBuildProfile();

console.log(`Use profile: ${profile}`);

if (profile === 'production') {
  module.exports = require('./config/webpack.prod');
} else if (profile === 'staging') {
  module.exports = require('./config/webpack.staging');
} else {
  module.exports = require('./config/webpack.dev');
}
