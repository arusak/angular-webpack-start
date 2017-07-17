module.exports = {
  plugins: [
    require('postcss-import')(),
    require('postcss-cssnext')({
      browsers: ['last 2 version'],
      features: {
        customProperties: {
          variables: require('./css-variables')
        }
      }
    }),
  ]
};
