/**
 * @file    index.js
 * @author  xiaohei
 * @date    2018/12/21
 * @description  index文件
 */

var Ycc = require('ycc-engine');
var Axis = require('./base/Axis');

window.YccCharts = YccCharts;
module.exports = exports = YccCharts;
/**
 *
 * @param option				{object}
 * @param option.xAxis			{object}
 * @param option.yAxis			{object}
 * @param option.angleAxis		{object}
 * @constructor
 */
function YccCharts(option) {
	
	/**
	 * 图表宽
	 * @type {number}
	 */
	this.width 		= option.width || 300;
	
	/**
	 * 图表高
	 * @type {number}
	 */
	this.height 	= option.height || 300;
	
	/**
	 * x坐标对象
	 * @type {null|Axis}
	 */
	this.xAxis 		= null;
	
	/**
	 * y坐标对象
	 * @type {null|Axis}
	 */
	this.yAxis 		= null;
	
	/**
	 * 极坐标
	 * @type {null|Axis}
	 */
	this.angleAxis 	= null;
	
	/**
	 * 图标类型
	 * line - 折线图
	 * pie	- 饼图
	 * 等等
	 * @type {string}
	 */
	this.type		= 'line';
	
	/**
	 * canvas元素
	 * @type {null}
	 */
	this.canvas 	= null;
	
	/**
	 * ycc实例
	 * @type {null}
	 */
	this.ycc		= null;
	
	
	this.init();
}


/**
 * 初始化
 */
YccCharts.prototype.init = function () {
	var canvas = document.createElement('canvas');
	canvas.width = this.width;
	canvas.height = this.height;
	var ycc = new Ycc().bindCanvas(canvas);
	var layer = ycc.layerManager.newLayer({name:"坐标轴"});
	
	// todo 在层里绘制


	this.xAxis = new Axis({},layer,this);
	this.canvas = canvas;
	this.ycc = ycc;
};

/**
 * 绘制
 */
YccCharts.prototype.render = function () {
	this.xAxis.render();
	this.ycc.layerManager.reRenderAllLayerToStage();
};

/**
 * 获取canvas
 */
YccCharts.prototype.getCanvas = function () {
	this.render();
	return this.canvas;
};