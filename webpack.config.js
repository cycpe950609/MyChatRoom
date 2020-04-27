const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry:  [
		path.join( __dirname ,  'App.js')
	],
	output: {
		path: path.join( __dirname , 'firebase/'),
		publicPath: 'firebase/',
		publicPath: 'https://www.gstatic.com',
		filename: 'chatroom.min.js'
	},
	resolve: {
		extensions: ['.js']
	},
	module: {
        rules: [
		{
			test: /\.(js)$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				query: {
					presets: ['@babel/preset-react', '@babel/preset-env']
				}
		},
		{
			test: /\.(jpe?g|png|gif|webp)$/,
			use: {
				loader: 'file-loader',
				options: {
					name: '[name].[ext]',
					outputPath: 'img/',
					publicPath: 'img/'
				}
			}
		},
		{
			test: /\.css$/,
			use: [
				'style-loader', // execute second(order is important)
				'css-loader' // execute first
			]
		},
		{
			test: /\.(html?)$/,
				use: {
					loader: 'file-loader',
					options: {
						name: '[name].[ext]',
						outputPath: '/',
					}
				}
		},
	    ],
	    
	},
	plugins: [
		//new webpack.HotModuleReplacementPlugin(),
		new webpack.ProvidePlugin({
			React: 'react',
			ReactDOM: 'react-dom'
		}),
		new CleanWebpackPlugin(),
		
		
		new HtmlWebpackPlugin({
			template: './src/index.html',
			filename: 'index.html',
			minify: {
				collapseBooleanAttributes: true,
				collapseWhitespace: true,
				removeAttributeQuotes: true,
				removeComments: true,
				removeEmptyAttributes: true,
				removeRedundantAttributes: true,
				removeScriptTypeAttributes: true,
				removeStyleLinkTypeAttributes: false,
				minifyCSS: true,
				minifyJS: true,
				sortAttributes: true,
				useShortDoctype: true
			},
			inject: false
		})
		
	],
};