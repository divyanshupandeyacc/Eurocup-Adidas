const jsdocConfig = require('build-tools-javascript/jsdoc.config.js');
const { name } = require('./package.json');

jsdocConfig.systemName = name;

module.exports = jsdocConfig;
