/*
* @Author: Administrator
* @Date:   2016-07-22 21:48:43
* @Last Modified by:   Administrator
* @Last Modified time: 2016-07-25 15:04:42
*/

'use strict';
(function(){
	window.Map=Class.extend({
		init:function(){
			this.map=[
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0]
			];
			this.w=50;
			this.h=50;
			this.colors=["#000000","#FFA500","#FF3E96","#CD6839","#98FB98","#3D3D3D","#00868B","#EED2EE"];
		},
		update:function(){
			//左右限制
			for(var r=0;r<game.cbm.instance.length;r++){
				for(var c=0;c<game.cbm.instance[r].length;c++){
					if(game.cbm.instance[c][r]!=null){
						if(game.cbm.instance[c][r].col<50){
							game.cbm.sonOff=true;
							game.cbm.ronOff=true;
						}
					}
					var length=game.cbm.instance[r].length-1;
					if(game.cbm.instance[c][length-r]!=null){
						if(game.cbm.instance[c][length-r].col+50>=game.canvas.width){
							//console.log(game.cbm.instance[c][length-r].col+50);
							game.cbm.sonOff=true;
							game.cbm.lonOff=true;
						}
					}
				}
			}
			//判断是否卡住了
			for(var i=0;i<game.cbm.instance.length;i++){
				for(var j=0;j<game.cbm.instance[i].length;j++){
					if(game.cbm.instance[i][j]!=null){
						var row=game.cbm.instance[i][j].row/50;
						var col=game.cbm.instance[i][j].col/50;
						if(this.map[row][col+1]!=0||this.map[row][col-1]!=0){
							game.cbm.sonOff=true;
						}
						if(row+1>=this.map.length||this.map[row+1][col]!=0){
							for(var r=0;r<game.cbm.instance.length;r++){
								for(var c=0;c<game.cbm.instance[r].length;c++){
									if(game.cbm.instance[r][c]!=null){
										this.map[game.cbm.instance[r][c].row/50][game.cbm.instance[r][c].col/50]=game.cbm.instance[r][c].c+1;
									}
								}
							}
							game.cbm.row=0;
							game.cbm.col=0;
							game.cbm._random=Math.floor(Math.random()*7);
							game.cbm.lonOff=false;
							game.cbm.ronOff=false;
							game.cbm.sonOff=false;
							game.cbm.state=0;
							console.log(game.cbm._random);
							game.cbm.createInstance();
						}
					}
				}
			}
			//消除
			for(var curr=this.map.length-1;curr>0;curr--){
				var num=0;
				for(var e=0;e<this.map[curr].length;e++){
						if(this.map[curr][e]!=0){
								num++;
						}
				}
				if(num>=this.map[curr].length){
					this.map.splice(curr,1);
					this.map.unshift([0,0,0,0,0,0,0,0,0,0]);
					game.sor.update();
				}
			}
			//输了
			for(var h=0;h<this.map[0].length;h++){
				if(this.map[0][h]!=0){
					game.pause();
				}
			}
		},
		render:function(){
			for(var r=0;r<this.map.length;r++){
				for(var c=0;c<this.map[r].length;c++){
					if(this.map[r][c]!=0){
						game.ctx.fillStyle=this.colors[this.map[r][c]];
						game.ctx.fillRect(c*this.w,r*this.h,this.w,this.h);
					}else{
						game.ctx.strokeRect(c*this.w,r*this.h,this.w,this.h);
					}
				}
			}
		}
	});
})();