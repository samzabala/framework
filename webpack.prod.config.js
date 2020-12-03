const path = require('path');  //for manipulating file path
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
	entry: {
		'framework-webpack' :'./js/framework.webpack.js'
	},
	output: {
		path: path.resolve(__dirname, './static'),
		filename: 'js/[name].webpack.min.js', //[contenthash]
		publicPath: ''
	},
	mode: 'production',
	module: {
		rules: [
			{
				test: /\.(eot|ttf|woff|woff2|svg)$/,
				loader: 'file-loader',
				options : {
					name: 'fonts/[name].[ext]'
				}
			},{

				test: /\.scss$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
					},{
						loader: 'css-loader',
					},{
						loader: 'sass-loader',
						options: {
							// Prefer `dart-sass`
							implementation: require("sass"),
						},
					}
				]
			},{

				test: /\.css$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
					},{
						loader: 'css-loader',
					}
				]
			},{

				test: /\.js$/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/env'],
					}
				}
			}
		]
	},
	resolve: {
		extensions: ['.js', '.css', '.scss']
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: 'css/[name].webpack.[contenthash].css'
		}),
		new CleanWebpackPlugin({
			cleanOnceBeforeBuildPatterns: 
			['./static/**/*']
		})
	]
}
