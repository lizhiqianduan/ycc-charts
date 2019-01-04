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
const isBuild = process.argv.slice(-1)[0]==='---build';

var config = {
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
		// 根目录dist
		contentBase: path.join(__dirname, "dist"),
		port: 9000,
		open:true,
		hot:true,
		//openPage:'./'
	},
	plugins: [
		new CleanWebpackPlugin(['dist']),
		new HtmlWebpackPlugin({
			title: '示例-折线图2222',
			filename:'demo-line.html',
			chunks:['line-demo']
		}),
		new webpack.HotModuleReplacementPlugin()
	],
};

if(!isBuild){
	config.plugins.shift();
}
module.exports = config;