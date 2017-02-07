/*
* @Author: Administrator
* @Date:   2016-07-25 16:53:13
* @Last Modified by:   Administrator
* @Last Modified time: 2016-07-26 12:07:46
*/

'use strict';
(function(){
	window.MobilePhoneUI=Class.extend({
		init:function(x,y,t){
			this.x=x;
			this.y=y;
			this.t=t;
			this.r=40;
		},
		render:function(){
			game.ctx.save();
			game.ctx.fillStyle="#FF3E96";
			game.ctx.beginPath();
			game.ctx.arc(this.x,this.y,this.r,0,2*Math.PI,false);
			game.ctx.fill();
			game.ctx.closePath();
			game.ctx.restore();
			game.ctx.save();
			game.ctx.fillStyle="#000000";
			game.ctx.fillText(this.t,this.x-5,this.y+5);
			game.ctx.restore();
		}
	});
})();