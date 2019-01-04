/**
 * @file    Axis.js
 * @author  xiaohei
 * @date    2018/12/21
 * @description  Axis文件
 */


var Ycc = require('ycc-engine');

module.exports = exports = Axis;

/**
 *
 * @param option
 * @param layer
 * @param chart
 * @constructor
 */
function Axis(option,layer,chart) {
	option = option || {};
	
	/**
	 * 轴线所在的图层
	 */
	this.layer = layer;
	
	/**
	 * 图表实例的引用
	 * @private
	 */
	this._chart = chart;
	
	/**
	 * 坐标轴类型
	 * x 		- x轴
	 * y 		- y轴
	 * angle	- 极坐标
	 * @type {string}
	 */
	this.type 				= option.type || 'x';
	
	/**
	 * 是否显示
	 * @type {boolean}
	 */
	this.show 				= option.show;
	
	/**
	 * 刻度文字列表
	 * @type {number[]|string[]}
	 */
	this.data				= option.data || [];
	
	/**
	 * 每个数据在轴线上的位置
	 * @type {Array}
	 * @private
	 */
	this._dataPos			= [];
	
	/**
	 * 默认的刻度值列表长度，初始时在data长度为0时使用
	 * @type {number}
	 */
	this._defaultDataLen	= 8;
	
	/**
	 * 坐标轴的起点
	 * @type {Ycc.Math.Dot}
	 */
	this.startDot = new Ycc.Math.Dot(20,20);
	
	this.init();
}


Axis.prototype.init = function () {
	
	if(this.data.length===0){
		var map = {
			x:'width',
			y:'height',
			angle:'360'
		};
		var step = Math.ceil(this._chart[map[this.type]]/this._defaultDataLen);
		for(var i=1;i<=this._defaultDataLen;i++){
			this.data.push(step*i);
		}
	}
};

Axis.prototype.render = function () {
	console.log(this.layer,222);
	
	var line = new Ycc.UI.Line({
		start:this.startDot,
		end:new Ycc.Math.Dot(this._chart.width,this.startDot.y)
	});
	this.layer.addUI(line);
	
	for(var i=0;i<this.data.length;i++){
		var x = this.data[i];
		line.addChild(new Ycc.UI.Line({
			start:new Ycc.Math.Dot(x,0),
			end:new Ycc.Math.Dot(x,10)
		}));
	}
};