/*
* @Author: Administrator
* @Date:   2016-07-22 22:19:00
* @Last Modified by:   Administrator
* @Last Modified time: 2016-07-25 11:09:33
*/

'use strict';
(function(){
	window.CellBlock=Class.extend({
		init:function(col,row,color){
			this.col=col;
			this.row=row;
			this.c=color;
			this.colors=["#FFA500","#FF3E96","#CD6839","#98FB98","#3D3D3D","#00868B","#EED2EE"];
		},
		render:function(){
			game.ctx.fillStyle=this.colors[this.c];
			game.ctx.fillRect(this.col,this.row,50,50);
		}
	});
})();