/**
 * @file    Axis.js
 * @author  xiaohei
 * @date    2018/12/21
 * @description  Axis文件
 */


var Ycc = require('ycc-engine');





/**
 * 轴线的构造函数
 * @param layer				{Ycc.Layer}		轴线绘制的图层
 * @param chart				{YccCharts}		轴线所属的图表
 * @constructor
 */
function Axis(layer,chart) {
	/**
	 * 计算之后的配置项
	 * @type {{}}
	 */
	var option = {};
	
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
	 * x轴线UI
	 * @type {null}
	 * @private
	 */
	this._xLineUI = null;

	/**
	 * x轴的刻度UI
	 * @type {Array}
	 * @private
	 */
	this._xStepListUI = [];
	
	/**
	 * x轴刻度对应的文本UI
	 * @type {Array}
	 * @private
	 */
	this._xLabelListUI = [];
	
	/**
	 * y轴线UI
	 * @type {null}
	 * @private
	 */
	this._yLineUI = null;
	
	/**
	 * y轴的刻度UI
	 * @type {Array}
	 * @private
	 */
	this._yStepListUI = [];
	
	/**
	 * y轴刻度对应的文本UI
	 * @type {Array}
	 * @private
	 */
	this._yLabelListUI = [];
	
	
	this.init();
}


Axis.prototype.init = function () {


};


/**
 * 渲染X轴
 * @param [setting] {OptionX}
 * 配置项，默认由全局配置项传入，此处可以单独设置
 * @todo 此渲染过程为离散数据的渲染，数值类型的渲染待做
 */
Axis.prototype.renderX = function (setting) {
	var option = setting||this.getOptionX();
	if(!option) return;
	
	console.log('render x',option);
	
	// 轴线UI
	var line = new Ycc.UI.Line({
		start:option.startDot,
		end:new Ycc.Math.Dot(option.width+option.startDot.x,option.startDot.y)
	});
	this.layer.addUI(line);
	
	// 刻度的步长
	var stepLen = option.width/option.data.length;
	// 刻度的起点
	var startX = option.startDot.x;
	// 轴线的刻度UI
	for(var i=0;i<option.data.length;i++){
		// 刻度的x坐标
		var stepX = startX+stepLen*(1+i)-option.startDot.x-option.stepStrokeWidth;
		var stepUI = new Ycc.UI.Line({
			start:new Ycc.Math.Dot(stepX,0),
			end:new Ycc.Math.Dot(stepX,option.stepDeep*-1),
			width:option.stepStrokeWidth
		});
		
		// 刻度上的文字UI
		var labelUI = new Ycc.UI.SingleLineText({
			rect:new Ycc.Math.Rect(stepX-100,option.stepDeep*-1-option.labelSize,200,option.labelSize),
			content:option.data[i]+'',
			xAlign:'center'
		});
		line.addChild(stepUI);
		line.addChild(labelUI);
		this._xStepListUI.push(stepUI);
		this._xLabelListUI.push(labelUI);
	}
	this._xLineUI = line;
};

/**
 * 渲染Y轴
 * @param [setting] {OptionX}
 * 配置项，默认由全局配置项传入，此处可以单独设置
 */
Axis.prototype.renderY = function (setting) {
	var option = setting||this.getOptionY();
	if(!option) return;
	
	console.log('render y',option);
	
	// 轴线UI
	var line = new Ycc.UI.Line({
		start:option.startDot,
		end:new Ycc.Math.Dot(option.startDot.x,option.width+option.startDot.y)
	});
	this.layer.addUI(line);
	
	// 刻度的步长
	var stepLen = option.width/option.data.length;
	// 刻度的起点
	var startY = option.startDot.y;
	// 轴线的刻度UI
	for(var i=0;i<option.data.length;i++){
		// 刻度的y坐标
		var stepY = startY+stepLen*(1+i)-option.startDot.y-option.stepStrokeWidth;
		var stepUI = new Ycc.UI.Line({
			start:new Ycc.Math.Dot(0,stepY),
			end:new Ycc.Math.Dot(option.stepDeep*-1,stepY),
			width:option.stepStrokeWidth
		});
		// 刻度上的文字UI
		var labelUI = new Ycc.UI.SingleLineText({
			rect:new Ycc.Math.Rect(-200-option.stepDeep,stepY-option.labelSize/2,200,option.labelSize),
			content:option.data[i]+'',
			xAlign:'right'
		});
		line.addChild(stepUI);
		line.addChild(labelUI);
		this._yStepListUI.push(stepUI);
		this._yLabelListUI.push(labelUI);
	}
	this._yLineUI = line;
};

/**
 * 整个渲染
 */
Axis.prototype.render = function () {
	this.renderX();
	this.renderY();
};

/**
 * 获取x轴的默认配置
 * 该配置对应于chart.option.xAxis
 * @return {{startDot: Ycc.Math.Dot, show: boolean, data: [string], width: number, stepColor: string, stepDeep: number, stepStrokeWidth: number}}
 */
Axis.prototype.getDefaultOptionX = function () {
	return new Axis.OptionX();
};

/**
 * 获取混合后x轴的配置项
 * @return {*}
 */
Axis.prototype.getOptionX = function () {
	var chartOption = this._chart.option.xAxis;
	if(!Ycc.utils.isObj(chartOption)) return null;
	return this._extend(this.getDefaultOptionX(),chartOption);
};

/**
 * 获取x轴的默认配置
 * 该配置对应于chart.option.yAxis
 * @return {{startDot: Ycc.Math.Dot, show: boolean, data: [string], width: number, stepColor: string, stepDeep: number, stepStrokeWidth: number}}
 */
Axis.prototype.getDefaultOptionY = function () {
	return new Axis.OptionY();
};

/**
 * 获取混合后y轴的配置项
 * @return {*}
 */
Axis.prototype.getOptionY = function () {
	var chartOption = this._chart.option.yAxis;
	if(!Ycc.utils.isObj(chartOption)) return null;
	return this._extend(this.getDefaultOptionY(),chartOption);
};


/**
 * 根据数据获取坐标系内的坐标位置
 * @todo 适用于离散数据
 * @param data
 * @param data.key
 * @param data.val
 * @return {Ycc.Math.Dot}
 */
Axis.prototype.getPositionByData = function (data) {
	var x = null,y=null,i=0;
	
	for(i=0;i<this._xLabelListUI.length;i++){
		if(this._xLabelListUI[i].content===data.key+''){
			x = this._xStepListUI[i].getAbsolutePosition().x;
			break;
		}
	}
	for(i=0;i<this._yLabelListUI.length;i++){
		if(this._yLabelListUI[i].content===data.val+''){
			y = this._yStepListUI[i].getAbsolutePosition().y;
			break;
		}
	}
	
	if(x===null || y===null)
		return console.error('can not match data in axis! maybe data is error!',data);
	return new Ycc.Math.Dot(x,y);
};




/**
 * 合并轴的参数
 * @param defaultOption
 * @param chartOption
 * @return {*}
 * @private
 */
Axis.prototype._extend = function (defaultOption,chartOption) {
	for(var i in defaultOption){
		if(typeof chartOption[i]!=='undefined' && defaultOption.hasOwnProperty(i))
			defaultOption[i] = chartOption[i];
	}
	return defaultOption;
};


/**
 * X轴的配置项
 * @static
 * @constructor
 */
Axis.OptionX = function () {
	/**
	 * 坐标轴的起点
	 * @type {Ycc.Math.Dot}
	 */
	this.startDot=new Ycc.Math.Dot(30,30);
	/**
	 * 是否显示
	 * @type {boolean}
	 */
	this.show=true;
	
	/**
	 * 坐标轴的长度
	 * @type {number}
	 */
	this.width=100;
	
	/**
	 * 坐标轴类型
	 * number - 数值轴 适合连续数值
	 * group - 分组轴 适合离散数轴
	 * @type {string}
	 */
	this.type = 'group';
	
	/**
	 * 刻度文字列表
	 * @type {number[]|string[]}
	 */
	this.data=['1'];
	/**
	 * 刻度的颜色值
	 * @type {string}
	 */
	this.stepColor='black';
	/**
	 * 刻度的深度
	 * @type {number}
	 */
	this.stepDeep=10;
	/**
	 * 刻度线条的宽度
	 * @TODO 此属性需要Ycc支持
	 * @type {*|number}
	 */
	this.stepStrokeWidth=1;
	
	/**
	 * 刻度文字大小
	 * @type {number}
	 */
	this.labelSize=16;
	
	/**
	 * 刻度文字的颜色
	 * @type {number}
	 */
	this.labelColor='black';
};

/**
 * Y轴的配置项
 * @static
 * @constructor
 */
Axis.OptionY = function () {
	Axis.OptionX.call(this);
};

module.exports = exports = Axis;
