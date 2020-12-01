const path = require('path');  //for manipulating file path
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
// const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
	entry: './index.js',
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: 'framework.webpack.min.js', //[contenthash]
		publicPath: ''
	},
	mode: 'none',
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
					MiniCssExtractPlugin.loader,'css-loader','sass-loader',
					
				]
			},{

				test: /\.css$/,
				use: [
					MiniCssExtractPlugin.loader,'css-loader',
				]
			},{

				test: /\.js$/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/env']
					}
				}
			}
		]
	},
	resolve: {
		extensions: ['.js', '.css', '.scss']
	},
	plugins: [
		new TerserPlugin(),
		new MiniCssExtractPlugin({
			filename: 'framework.webpack.css'
		}),
		// new CleanWebpackPlugin({
		// 	cleanOnceBeforeBuildPatterns: 
		// 	['**/*', path.join(process.cwd()),'dist/**/*']
		// })
	]
}
