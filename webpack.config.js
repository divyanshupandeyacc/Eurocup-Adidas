const { mode, output, devServer, devtool } = require('build-tools-webpack');
const { rules: babelRules } = require('build-tools-webpack-babel');
const {
	rules: scssRules,
	plugin: extractPlugin,
} = require('build-tools-webpack-sass/extract');
const { rules: fileRules } = require('build-tools-webpack-files');
const { EnvironmentPlugin } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	mode,
	entry: {
		app: './src/main.jsx',
	},
	output: {
		...output,
		chunkFilename: 'chunk-[name].[contenthash].js',
		publicPath: '/',
	},
	module: {
		rules: [...babelRules, ...scssRules, ...fileRules],
	},
	resolve: {
		extensions: ['.js', '.jsx', '.json'],
	},
	optimization: {
		splitChunks: {
			chunks: 'all',
		},
	},
	devServer,
	devtool,
	plugins: [
		extractPlugin,
		new HtmlWebpackPlugin({
			template: 'src/index.html',
			inject: 'body',
		}),
		new EnvironmentPlugin({
			NODE_ENV: 'development',
			API_HOST: 'http://api.football-data.org/v2',
			TOKEN: '667384515bad452e88557e5ba7b90fc9',
		}),
	],
};
