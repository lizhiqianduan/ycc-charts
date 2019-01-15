/**
 * @file    line.js
 * @author  xiaohei
 * @date    2019/1/4
 * @description  line文件
 */


var YccCharts = require('../../src/index');

var chart = new YccCharts({
	type:'line',
	data:[
		{key:1,val:5},
		{key:5,val:9},
		{key:9,val:3},
	],
	xAxis:{
		show:true,
		data:[1,2,5,9]
	},
	yAxis:{
		show:true,
		data:[3,5,7,9]
	},
});

console.log(chart);
document.body.appendChild(chart.getCanvas());

chart.render();


window.xxx = chart;
