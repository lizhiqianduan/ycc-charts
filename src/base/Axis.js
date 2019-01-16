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
	
	/**
	 * 坐标轴体系的正方向，根据直角坐标系四个象限顺时针生成
	 * 1 x轴向右 y轴向上
	 * 2 x轴向右 y轴向下
	 * 3 x轴向左 y轴向下
	 * 4 x轴向左 y轴向上
	 *
	 * 默认坐标系与原生canvas一致
	 * @type {number}
	 */
	this.direction = 1;
	
	
	this.init();
}


Axis.prototype.init = function () {


};

/**
 * 获取坐标系内某个点相对于舞台的绝对坐标
 * @param dot {Ycc.Math.Dot}	该点的
 * @return {Ycc.Math.Dot}
 */
Axis.prototype.getAbsoluteDot = function (dot) {
	var newDot = new Ycc.Math.Dot(dot);
	var stageW = this._chart.ycc.getStageWidth();
	var stageH = this._chart.ycc.getStageHeight();
	if(this.direction===2)
		return newDot;
	
	if(this.direction===1){
		newDot.y = stageH-dot.y;
		return newDot;
	}
	
	if(this.direction===3){
		newDot.x = stageW-dot.x;
		return newDot;
	}
	if(this.direction===4){
		newDot.y = stageH-dot.y;
		newDot.x = stageW-dot.x;
		return newDot;
	}
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
	
	var startDot = this.getAbsoluteDot(option.startDot);
	var endDot = this.getAbsoluteDot(new Ycc.Math.Dot(option.width+option.startDot.x,option.startDot.y));
	
	
	// 轴线UI
	var line = new Ycc.UI.Line({
		start:startDot,
		end:endDot
	});
	this.layer.addUI(line);

	
	////////////// 下面绘制刻度相关
	//// 刻度线和文字 都是轴线的子节点
	
	// 轴线是否从左至右
	var positive = startDot.x<=endDot.x;
	// 刻度的步长
	var stepLen = option.width/option.data.length;
	// 刻度的朝向，1向下，-1向上
	var stepDirection = [1,4].indexOf(this.direction)===-1?-1:1;
	// 轴线的刻度UI
	for(var i=0;i<option.data.length;i++){
		// 刻度的x坐标
		var stepX = positive?stepLen*(1+i):option.width-stepLen*(1+i);
		var stepUI = new Ycc.UI.Line({
			start:new Ycc.Math.Dot(stepX,0),
			end:new Ycc.Math.Dot(stepX,option.stepDeep*stepDirection),
			width:option.stepStrokeWidth
		});
		
		// 刻度上的文字UI
		var labelUI = new Ycc.UI.SingleLineText({
			rect:new Ycc.Math.Rect(stepX-100,option.stepDeep*stepDirection-(stepDirection===1?0:option.labelSize),200,option.labelSize),
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
	
	
	var startDot = this.getAbsoluteDot(option.startDot);
	var endDot = this.getAbsoluteDot(new Ycc.Math.Dot(option.startDot.x,option.width+option.startDot.y));
	
	
	// 轴线UI
	var line = new Ycc.UI.Line({
		start:startDot,
		end:endDot
	});
	this.layer.addUI(line);


	////////////// 下面绘制刻度相关
	//// 刻度线和文字 都是轴线的子节点
	
	// 轴线是否从上至下
	var positive = startDot.y<=endDot.y;
	// 刻度的步长
	var stepLen = option.width/option.data.length;
	// 刻度的朝向，1向右，-1向左
	var stepDirection = [1,2].indexOf(this.direction)!==-1?-1:1;
	
	// 轴线的刻度UI
	for(var i=0;i<option.data.length;i++){
		// 刻度的x坐标
		var stepY = positive?stepLen*(1+i):option.width-stepLen*(1+i);
		var stepUI = new Ycc.UI.Line({
			start:new Ycc.Math.Dot(0,stepY),
			end:new Ycc.Math.Dot(option.stepDeep*stepDirection,stepY),
			width:option.stepStrokeWidth
		});
		
		// 刻度上的文字UI
		var labelUI = new Ycc.UI.SingleLineText({
			rect:new Ycc.Math.Rect(stepDirection===1?option.stepDeep:(-200-option.stepDeep),stepY-option.labelSize/2,200,option.labelSize),
			content:option.data[i]+'',
			xAlign:stepDirection===1?'left':'right'
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
	var option = new Axis.OptionX();
	option.width = this._chart.ycc.getStageWidth()-option.startDot.x*2;
	return option;
};

/**
 * 获取混合后x轴的配置项
 * @return {Axis.OptionX}
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
	var option = new Axis.OptionY();
	option.width = this._chart.ycc.getStageWidth()-option.startDot.y*2;
	return option;
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
	 * 此坐标为相对坐标，相对于坐标系的方向direction参数
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
	 * group - 分组轴 适合离散数轴，此时必须设置刻度的文字列表data
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
