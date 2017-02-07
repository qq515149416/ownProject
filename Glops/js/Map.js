/*
* @Author: Administrator
* @Date:   2016-07-27 10:41:58
* @Last Modified by:   Administrator
* @Last Modified time: 2016-08-02 18:20:22
*/

'use strict';
(function(){
	window.Map=Class.extend({
		init:function(){
			this.map=[
				[1,2,3,4,4,0,0,1,2,3],
				[2,1,2,1,4,4,0,0,2,3],
				[3,2,1,3,3,4,3,2,0,1],
				[4,4,0,4,4,2,0,3,3,4],
				[0,3,3,1,3,1,1,4,4,0],
				[0,4,4,0,0,2,2,1,4,1],
				[1,0,1,4,1,4,4,3,1,2],
				[2,3,2,0,2,1,1,0,3,3],
				[3,2,4,1,3,2,3,3,4,0],
				[4,1,0,2,0,3,2,4,0,1]
			];//鸟图（决定图案的摆放的样子）
			//console.log(this.map);
			this.arrsqs=[
				[null,null,null,null,null,null,null,null,null,null],
				[null,null,null,null,null,null,null,null,null,null],
				[null,null,null,null,null,null,null,null,null,null],
				[null,null,null,null,null,null,null,null,null,null],
				[null,null,null,null,null,null,null,null,null,null],
				[null,null,null,null,null,null,null,null,null,null],
				[null,null,null,null,null,null,null,null,null,null],
				[null,null,null,null,null,null,null,null,null,null],
				[null,null,null,null,null,null,null,null,null,null],
				[null,null,null,null,null,null,null,null,null,null]
			];//存放实例的
			this.w=70;
			this.h=70;
			this.createSquares();
		},
		createSquares:function(){
			for(var r=0;r<this.map.length;r++){
				for(var c=0;c<this.map[r].length;c++){
					this.arrsqs[r][c]=new Squares(c*this.w,-50,c*this.w,r*this.h,this.map[r][c]);
				}
			}
		},
		allAenderAndUpdate:function(){
			for(var i=0;i<this.arrsqs.length;i++){
				for(var j=0;j<this.arrsqs[i].length;j++){
					this.arrsqs[i][j]&&this.arrsqs[i][j].update();
					this.arrsqs[i][j]&&this.arrsqs[i][j].render();
				}
			}
		}
	});
})();