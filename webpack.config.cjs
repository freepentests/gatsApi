const path = require('node:path');

module.exports = {
	entry: {
		app: './src/index.js'
	},
	mode: 'production',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].js'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				use: ['babel-loader']
			}
		]
	}
}

