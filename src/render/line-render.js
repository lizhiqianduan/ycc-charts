/**
 * @file    line-render.js
 * @author  xiaohei
 * @date    2019/1/4
 * @description  line-render文件
 */

var Ycc = require('ycc-engine');
var Axis = require('../base/Axis');

/**
 * 折线图的渲染函数
 * @param chart		{YccCharts}	chart实例
 * @return {boolean}
 */
function lineRender(chart) {
	console.log('line-render');
	
	var data = chart.option.data;
	if(!Ycc.utils.isArray(data)){
		return false;
	}
	
	var posList = [];
	for(var i=0;i<data.length;i++){
		posList.push(chart.axis.getPositionByData(data[i]));
	}
	console.log(posList);
	
	
	
	/*var axis = new Axis(chart.ycc.layerManager.newLayer({name:'坐标轴图层'}),chart);
	var settingX = new Axis.OptionX();
	var settingY = new Axis.OptionY();
	settingX.data = xData;
	settingY.data = yData;
	axis.renderX(settingX);
	axis.renderY(settingY);*/
	
	console.log('axis',chart.axis);
	
	var layer = chart.ycc.layerManager.newLayer({name:'折线图',enableEventManager:true});
	layer.addUI(new Ycc.UI.BrokenLine({
		pointList:posList
	}));
	
	for(i=0;i<posList.length;i++){
		var circle = new Ycc.UI.Circle({
			point:posList[i],
			r:5,
			fill:false,
			color:'green',
		});
		circle.addChild(new Ycc.UI.Circle({
			point:new Ycc.Math.Dot(5,5),
			stopEventBubbleUp:false,
			r:4,
			color:'white',
		}));
		layer.addUI(circle);
	}
	
	chart.ycc.layerManager.reRenderAllLayerToStage();
	return true;
}

/*

 {
 	key:'',
 	val:'',
 }
 

 */



function LineOption(){
	
	/**
	 * 线条颜色
	 * @type {string}
	 */
	this.color	= 'black';
	
	/**
	 * 线条宽度
	 * @type {number}
	 */
	this.lineWidth = 1;
	
	
	this.data = [];
	
}


module.exports = exports = lineRender;

