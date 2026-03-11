const { merge } = require('webpack-merge');
const { baseConfig } = require('./baseConfig');

module.exports = merge(baseConfig, {
  mode: 'production'
});
