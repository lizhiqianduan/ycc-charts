/**
 * @file    index.js
 * @author  xiaohei
 * @date    2018/12/21
 * @description  index文件
 */

var Ycc = require('ycc-engine');
var Axis = require('./base/Axis');



window.Ycc = Ycc;
window.Ycc.Charts = YccCharts;

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
}

