const path = require('path');  //for manipulating file path
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
// const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
	entry: {
		'framework.webpack' :'./js/framework.webpack.js'
	},
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: 'js/[name].webpack.min.js',
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
	// optimization: {
	// 	splitChunks : {
	// 		chunks:' all'
	// 	}
	// },
	plugins: [
		new TerserPlugin(),
		new MiniCssExtractPlugin({
			filename: 'css/[name].webpack.min.css'
		}),
		// new CleanWebpackPlugin({
		// 	cleanOnceBeforeBuildPatterns: 
		// 	['**/*', path.join(process.cwd()),'dist/**/*']
		// })
	]
}
