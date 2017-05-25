var webpack = require('webpack');
var autoprefixer = require('autoprefixer');

module.exports = {
	devtool: 'cheap-module-eval-source-map',
	entry: ['./example/src/index.jsx'],
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					'style-loader', {
						loader: 'css-loader',
						options: {
							importLoaders: 1
						}
					},
					'postcss-loader'
				]
			},
			{
        		test: /\.jsx?$/,
				exclude: [/node_modules/],
				use: [
					'eslint-loader',
					'babel-loader',
				]
			},
		]
	},
	output : {
		path: __dirname + '/example/build/',
		publicPath: '/',
		filename: 'index.js'
	},
};
