/*
* @Author: Administrator
* @Date:   2016-07-25 10:40:42
* @Last Modified by:   Administrator
* @Last Modified time: 2016-07-31 21:15:09
*/

'use strict';
(function(){
	window.Score=Class.extend({
		init:function(){
			this.score=0;
		},
		update:function(){
			this.score+=5;
			if(this.score>=1000){
				var textX=game.ctx.measureText("你赢了请我吃饭分数是"+this.score);
				game.ctx.save();
				game.ctx.shadowOffsetX=1;
				game.ctx.shadowOffsetY=1;
				game.ctx.shadowBlur=2;
				game.ctx.shadowColor="rgba(0,0,0,1)";
				game.ctx.fillStyle="#FF7F00";
				game.ctx.font="30px 微软雅黑";
				game.ctx.fillText("你赢了请我吃饭分数是"+this.score,game.canvas.width/2-textX.width,game.canvas.height/2);
				game.ctx.restore();
				game.pause();
			}
		},
		render:function(){
			game.ctx.save();
			game.ctx.shadowOffsetX=1;
			game.ctx.shadowOffsetY=1;
			game.ctx.shadowBlur=1;
			game.ctx.shadowColor="rgba(0,0,0,1)";
			game.ctx.fillStyle="red";
			game.ctx.font="18px 微软雅黑";
			game.ctx.fillText("你的分数是："+this.score,25,25);
			game.ctx.restore();
		}
	});
})();