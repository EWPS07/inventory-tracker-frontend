// Karma configuration
// Generated on Fri Feb 10 2017 09:46:25 GMT-0800 (PST)

const webpack = require('./webpack.config.js');
webpack.entry = {};

module.exports = function(config) {
  config.set({
    webpack,
    port: 9876,
    colors: true,
    basePath: '',
    autoWatch: true,
    singleRun: false,
    concurrency: Infinity,
    frameworks: ['jasmine'],
    reporters: ['mocha'],
    browsers: ['PhantomJS'],
    logLevel: config.LOG_INFO,
    preprocessors: {
      'test/**/*-test.js': ['webpack'],
      'app/entry.js': ['webpack'],
    },
    files: [
      'app/entry.js',
      'test/**/*-test.js',
      'node_modules/angular-mocks/angular-mocks.js',
    ],
  });
};
