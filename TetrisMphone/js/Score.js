/*
* @Author: Administrator
* @Date:   2016-07-25 10:40:42
* @Last Modified by:   Administrator
* @Last Modified time: 2016-07-25 10:55:34
*/

'use strict';
(function(){
	window.Score=Class.extend({
		init:function(){
			this.score=0;
		},
		update:function(){
			this.score+=10;
			if(this.score>=100){
				game.pause();
				game.ctx.save();
				game.ctx.fillStyle="#000000";
				game.ctx.font="30px 微软雅黑";
				game.ctx.fillText("你赢了请我吃饭分数是"+this.score,game.canvas.width/2,game.canvas.height/2);
				game.ctx.restore();
			}
		},
		render:function(){
			game.ctx.save();
			game.ctx.fillStyle="#000000";
			game.ctx.font="18px 微软雅黑";
			game.ctx.fillText("你的分数是："+this.score,25,25);
			game.ctx.restore();
		}
	});
})();