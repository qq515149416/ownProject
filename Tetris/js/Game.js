/*
* @Author: Administrator
* @Date:   2016-07-22 21:36:57
* @Last Modified by:   Administrator
* @Last Modified time: 2016-07-25 10:49:03
*/

'use strict';
(function(){
	window.Game=Class.extend({
		init:function(){
			//初始化
			this.fps=30;//帧数
			this.timer=null;//定时器
			this.canvas=document.getElementById("canvas");//获取canvas对象
			this.ctx=this.canvas.getContext("2d");//得到上下文
		},
		run:function(){
			//开始执行
			this.ifs=new IframeFps();
			this.map=new Map();
			this.sor=new Score();
			this.cbm=new CellBlockManage(0,0);
			var self=this;
			self.timer=setInterval(function(){
				self.mainloop();
			},1000/self.fps);
		},
		mainloop:function(){
			//每帧执行
			//清屏
			this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
			this.ifs.update();
			this.map.update();
			this.map.render();
			this.sor.render();
			this.cbm.allRender();
		},
		pause:function(){
			//结束执行
			clearInterval(this.timer);
		}
	});
})();