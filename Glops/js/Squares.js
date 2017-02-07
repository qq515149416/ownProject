/*
* @Author: Administrator
* @Date:   2016-07-27 10:18:50
* @Last Modified by:   Administrator
* @Last Modified time: 2016-07-30 17:45:41
*/

'use strict';
(function(){
	window.Squares=Class.extend({
		init:function(x,y,targetX,targetY,icon){
			this.x=x;
			this.y=y;
			this.tx=targetX;
			this.ty=targetY;
			this.speed=5;
			this.icon=icon;
			this.iArry=["butterfly","dog","rabbit","tiger","pig"];//图标数组有效值是0~4;
		},
		update:function(){
			if(this.x<this.tx){
				this.x+=this.speed;
			}
			if(this.y<this.ty){
				this.y+=this.speed;
			}
		},
		render:function(){
			//console.log(this.icon);
			game.ctx.drawImage(game.image[this.iArry[this.icon]],this.x,this.y);
		}
	});
})();