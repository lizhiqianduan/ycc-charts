/**
 * @file    webpack.config.js.js
 * @author  xiaohei
 * @date    2018/12/21
 * @description  webpack.config.js文件
 */



const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');


module.exports = {
	entry: {
		'ycc-charts':'./src/index.js',
		'line-demo':'./demo/line/line.js'
	},
	output: {
		filename: '[name].build.js',
		path: path.resolve(__dirname, 'dist')
	},
	
	
	mode:"development",
	// 生成map
	devtool:"source-map",
	
	devServer:{
		contentBase: path.join(__dirname, "dist"),
		port: 9000,
		open:true,
		openPage:'./demo/line'
	},
	//watch: true,
	plugins: [
		new CleanWebpackPlugin(['dist']),
		new HtmlWebpackPlugin({
			title: '示例-折线图',
			filename:'./demo/line/index.html',
			chunks:['line-demo']
		}),
		//new webpack.HotModuleReplacementPlugin()
	],

	
	
};