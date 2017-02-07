/*
* @Author: Administrator
* @Date:   2016-07-26 21:10:54
* @Last Modified by:   Administrator
* @Last Modified time: 2016-07-31 12:02:15
*/

'use strict';
(function(){
	window.Game=Class.extend({
		init:function(){
			//初始化
			this.timer=null;
			this.fps=30;
			this.image=null;
			this.canvas=document.getElementById("canvas");
			this.ctx=this.canvas.getContext("2d");
			this.requestimage=new ImageManage();
			var self=this;
			this.requestimage.loadImages("js/r.json",function(allNumber,currNumber,objImage){
				if(allNumber==currNumber){
					self.image=objImage;
					self.ren();
				}
			});
		},
		ren:function(){
			//开始执行渲染工作
			this.map=new Map();//地图
			this.dm=new DecisionMakers();//有机状态机
			this.me=new MoveEvent();//事件处理类
			this.de=new Determine();//逻辑判断类（检测是否能消或者连消）
			this.sf=new Successful();//消元素类
			this.re=new Return();//返回类
			this.score=new Score();
			var self=this;
			self.timer=setInterval(function(){
				self.mainloop();
			},1000/self.fps);
		},
		mainloop:function(){
			//清除画布
			this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
			//要渲染的元素
			this.map.allAenderAndUpdate();
			this.dm.choose();//有限状态判断
			this.score.render();
		},
		pause:function(){
			//清除定时器（暂停用的）
			clearInterval(this.timer);
		}
	});
})();