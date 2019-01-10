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
	 * x坐标对象
	 * 初始时会重载对象的属性
	 * @type {null|Axis}
	 */
	this.xAxis 		= option.xAxis;
	
	/**
	 * y坐标对象
	 * 初始时会重载对象的属性
	 * @type {null|Axis}
	 */
	this.yAxis 		= option.yAxis;
	
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
	this.canvas = document.createElement('canvas');
	this.canvas.width = this.width;
	this.canvas.height = this.height;
	this.ycc = new Ycc().bindCanvas(this.canvas);
	
};

/**
 * 绘制
 */
YccCharts.prototype.render = function () {

	var layer = this.ycc.layerManager.newLayer({name:"坐标轴"});
	var axis = new Axis(layer,this);
	axis.render();

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