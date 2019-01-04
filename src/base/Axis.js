/**
 * @file    Axis.js
 * @author  xiaohei
 * @date    2018/12/21
 * @description  Axis文件
 */


var Ycc = require('ycc-engine');

function Axis(option,chart) {
	option = option || {};
	
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
	 * 刻度值列表
	 * @type {number[]|string[]}
	 */
	this.data				= option.data || [];
	
	/**
	 * 默认的刻度值列表长度，初始时在data长度为0时使用
	 * @type {number}
	 */
	this._defaultDataLen	= 8;
	
	/**
	 * 坐标轴的起点
	 * @type {Ycc.Math.Dot}
	 */
	this.startDot = null;
	
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

Axis.prototype.xRender = function () {

}