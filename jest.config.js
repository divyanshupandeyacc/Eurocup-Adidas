require('dotenv').config();
module.exports = {
	...require('build-tools-jest'),
	...require('build-tools-babel-jest'),
	verbose: true,
	testEnvironment: 'jsdom',
	setupFiles: ['./src/setupTests.js', 'dotenv/config'],
};
