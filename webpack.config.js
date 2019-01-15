/**
 * @file    webpack.config.js.js
 * @author  xiaohei
 * @date    2018/12/21
 * @description  webpack.config.js文件
 */



const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const isBuild = process.argv.slice(-1)[0]==='---build';

// 示例的根目录
const demoRootPath = path.join(__dirname, 'demo');
// 示例chunk入口的前缀
const demoPrefix = 'demo-';
// demo HTML页面title的前缀
const demoTitlePrefix = '示例-';
// 示例输出目录名
const demoOutputDirName = 'demo';

var config = {
	entry: {
		'ycc-charts':'./src/index.js',
	},
	output: {
		filename: function(file){
			return 'chunk/[name].chunk.js';
		},//'[name].build.js',
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
		openPage:'./'+demoOutputDirName
	},
	plugins: [
		new CleanWebpackPlugin(['dist']),
		
		new webpack.HotModuleReplacementPlugin()
	],
};

// 示例列表根据demo目录的文件夹自动构建
var demoList = fs.readdirSync(demoRootPath);
for(var i=0;i<demoList.length;i++){
	var demoDirName = demoList[i];
	var demoPath = path.join(demoRootPath,demoDirName);
	if(!fs.statSync(demoPath).isDirectory())
		continue;

	var chunkName = demoPrefix+demoDirName;
	
	config.entry[chunkName] = demoPath;
	
	config.plugins.push(new HtmlWebpackPlugin({
		template:demoRootPath+'/tpl.html',
		title: demoTitlePrefix+demoDirName,
		filename:demoOutputDirName+'/'+demoDirName+'.html',
		chunks:[chunkName]
	}))
}

if(!isBuild){
	config.plugins.shift();
}
module.exports = config;