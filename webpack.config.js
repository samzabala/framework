const path = require('path');  //for manipulating file path
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const _fw_files = {
	// css + fonts if eh. i add .css kasi mas madaling linisin yuno yuno
		'framework.css' : './scss/framework.scss',
		'framework.layout.css' : './scss/framework.layout.scss',
		'framework.lite.css' : './scss/framework.lite.scss',
		'framework.normalize.css' : './scss/framework.normalize.scss',
		'framework.ultilities.css' : './scss/framework.utilities.scss',

	// js bois
		'framework.webpack' : [
			'./js/framework.webpack.js',
		],
}

//loaders
	const _mini_css = {
			loader: MiniCssExtractPlugin.loader,
		};
	const _css_loader = {
			loader: 'css-loader',
			options : {
				import: false
			}
		};
	const _postcss_loader = {
			loader:'postcss-loader',
			options: {
				postcssOptions: {
					plugins:[autoprefixer]
				}
			}
		};
	const _sass_loader = {
			loader: 'sass-loader',
			options: {
				// Prefer `dart-sass`
				sassOptions: {
					outputStyle:'expanded'
				},
				implementation: require("sass"),
			},
		};

const _fw_config = {
	entry: _fw_files,
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: 'js/[name].js',
		publicPath: './../',
		library: {
			root: 'fw',
			commonjs: 'frameWork',
			amd: 'frameWork',
		},
		libraryTarget: 'umd',
		umdNamedDefine: true,
		libraryExport: 'default',
		globalObject: "typeof self !== 'undefined' ? self : this"
	},
	devtool: "source-map",
	mode: 'none',
	module: {
		rules: [
			{
			// 	test: /\.(eot|ttf|woff|woff2|svg)$/,
			// 	loader: 'file-loader',
			// 	options : {
			// 		publicPath: './../',
			// 		name: 'fonts/[name].[ext]'
			// 	}
			// },{

				test: /\.scss$/,
				use: [
					_mini_css,
					_css_loader,
					_postcss_loader,
					_sass_loader
				]
			},{

			// 	test: /\.css$/,
			// 	use: [
			// 		_mini_css,
			// 		_css_loader,
			// 		_postcss_loader,
			// 	]
			// },{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				options: {
					presets: [
						[
							"@babel/preset-env",
							{
								"loose": true,
								"bugfixes": true,
								"modules": false
							}
						]
					],
					plugins: [
						[
							"@babel/plugin-proposal-class-properties",
							{ "loose": true }
						]
					]
				}
			}
		]
	},
	resolve: {
		extensions: ['.js', '.css', '.scss'],
	},
	optimization: {
		// minimize: true,
		concatenateModules: true,
		minimizer: [

			new TerserPlugin({
				terserOptions: {
					ecma: 5,
					parse: {
						ecma: 5
					},
					compress: {},
					output: {
						ecma: 5,
						comments: true,
						ascii_only: true,
						beautify: true
					},
					keep_classnames: true,
					keep_fnames: true,
					ie8: true,
					module: false,
				},
			})
		]
		// splitChunks: {
		// 	// include all types of chunks
		// 	chunks: 'all'
		// }
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename:'css/[name]'
		}),
		new CleanWebpackPlugin({
			cleanStaleWebpackAssets: true,
			cleanOnceBeforeBuildPatterns: 
				[path.resolve(__dirname, './dist')+'/**/*'],
			cleanAfterEveryBuildPatterns:
				[path.resolve(__dirname, './dist')+'/**/*.css.js.map',path.resolve(__dirname, './dist')+'/**/*.css.js']
		}),
		new CopyWebpackPlugin({
			patterns: [
				{
					from: path.resolve(__dirname, './fonts'),
					to: path.resolve(__dirname, './dist/fonts/'),
					toType: 'dir',
					globOptions: {
					ignore: ['*.DS_Store', 'Thumbs.db','generator_config.txt'],
					},
				},
			],
		}),
	]
}



module.exports = _fw_config;