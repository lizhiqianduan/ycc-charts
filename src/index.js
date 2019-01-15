/**
 * @file    index.js
 * @author  xiaohei
 * @date    2018/12/21
 * @description  index文件
 */

var Ycc = require('ycc-engine');
var Axis = require('./base/Axis');
var render = require('./render/index');




/**
 *
 * @param option				{object}
 *
 * @param option.type			{string}
 * 图标类型
 * line - 折线图
 * pie	- 饼图
 *
 * @param option.xAxis			{Axis.OptionX}	x轴的配置项
 *
 * @param option.yAxis			{Axis.OptionY}	y轴的配置项
 *
 * @constructor
 */
function YccCharts(option) {
	
	/**
	 * 配置项
	 * @type {Object}
	 */
	this.option = option;
	
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
	 * 坐标轴的引用
	 * @type {null}
	 */
	this.axis		= null;
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
	this.canvas = document.createElement('canvas');
	this.canvas.width = this.width;
	this.canvas.height = this.height;
	this.ycc = new Ycc().bindCanvas(this.canvas);
	
};

/**
 * 绘制
 */
YccCharts.prototype.render = function () {

	this.axis = new Axis(this.ycc.layerManager.newLayer({name:"坐标轴"}),this);
	this.axis.render();

	// 渲染对应的图形
	if(!!this.option.type) render[(this.option.type+'Render')](this);
	
	this.ycc.layerManager.reRenderAllLayerToStage();
};

/**
 * 获取canvas
 */
YccCharts.prototype.getCanvas = function () {
	return this.canvas;
};


YccCharts.prototype.extend = function (targetObj, src) {
	var obj2 = Ycc.utils.deepClone(src);
	for (var i in targetObj) {
		if(!targetObj.hasOwnProperty(i)) continue;
		if (obj2 && typeof obj2[i] !=="undefined") {
			targetObj[i] = obj2[i];
		}
	}
	return targetObj;
};

window.YccCharts = YccCharts;
module.exports = exports = YccCharts;
