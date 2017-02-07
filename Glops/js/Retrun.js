/*
* @Author: Administrator
* @Date:   2016-07-30 21:21:44
* @Last Modified by:   Administrator
* @Last Modified time: 2016-08-01 10:31:14
*/

'use strict';
(function(){
	window.Return=Class.extend({
		init:function(){
			this.row=0;
			this.col=0;
			this.trow=0;
			this.tcol=0;
			this.onOff=false;
		},
		exchange:function(){
			if(this.onOff){
				var tem=0;
				tem=game.map.map[this.trow][this.tcol];
				game.map.map[this.trow][this.tcol]=game.map.map[this.row][this.col];
				game.map.map[this.row][this.col]=tem;
				//console.log(game.map.map[this.row][this.col]+":"+game.map.map[this.trow][this.tcol]);
				//console.log(game.map.map);
				game.map.arrsqs[this.row][this.col]=new Squares(this.col*game.map.w,this.row*game.map.h,this.col*game.map.w,this.row*game.map.h,game.map.map[this.row][this.col]);
				game.map.arrsqs[this.trow][this.tcol]=new Squares(this.tcol*game.map.w,this.trow*game.map.h,this.tcol*game.map.w,this.trow*game.map.h,game.map.map[this.trow][this.tcol]);
				this.onOff=false;
			}
			game.dm.state=0;
			game.me.kg=true;
		}
	});
})();