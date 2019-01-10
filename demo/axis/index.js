/**
 * @file    axis.js
 * @author  xiaohei
 * @date    2019/1/4
 * @description  axis文件
 */

var YccCharts = require('../../src/index');

var chart = new YccCharts({
	xAxis:{
		show:true,
		data:['a',1,'b','3']
	},
	yAxis:{
		show:true,
		data:['a',1,'b','3']
	},
});

console.log(chart);
document.body.appendChild(chart.getCanvas());

chart.render();