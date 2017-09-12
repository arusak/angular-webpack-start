module.exports = function (config) {
  config.set({
    basePath: '../src/',
    files: [
      {pattern: 'test.ts', watched: false}
    ],
    frameworks: ['jasmine'],
    preprocessors: {
      '**/*.ts': ['webpack', 'sourcemap']
    },
    webpack: require('./webpack.test'),
    reporters: ['progress', 'verbose'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_LOG,
    autoWatch: true,
    browsers: ['PhantomJS'],
    singleRun: true,
    concurrency: Infinity,
  })
};
