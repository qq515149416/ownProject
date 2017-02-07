/*
* @Author: Administrator
* @Date:   2016-07-28 11:14:23
* @Last Modified by:   Administrator
* @Last Modified time: 2016-08-02 21:20:35
*/

'use strict';
(function(){
	window.MoveEvent=Class.extend({
		init:function(){
			this.save=true;
			this.temX=0;
			this.temY=0;
			this.onOff=true;
			this.kg=true;
			this.obj=null;
			this.testS=0;
			this.testC=0;
			this.moveEvent();
			//console.log(game.map.map);
		},
		moveEvent:function(){
				var self=this;
				var initialX=0;
				var initialY=0;
				var row=0;
				var col=0;
				var touchX=0;
				var touchY=0;
				function arrsqsObj(event,arrsqs,isrc){
					//console.log(game.dm.state);
					event.preventDefault();
					if(event.offsetX>arrsqs.x&&event.offsetX<arrsqs.x+game.map.w){
						if(event.offsetY>arrsqs.y&&event.offsetY<arrsqs.y+game.map.h){
							console.log("OK");
							var trow=Math.ceil(arrsqs.y/game.map.h);
							var tcol=Math.ceil(arrsqs.x/game.map.w);
							var tem=0;
							/*self.temX=arrsqs.x;
							self.temY=arrsqs.y;
							arrsqs.x=initialX;
							arrsqs.tx=initialX;
							arrsqs.y=initialY;
							arrsqs.ty=initialY;
							obj.x=self.temX;
							obj.y=self.temY;
							obj.tx=self.temX;
							obj.ty=self.temY;*/
							//console.log(initialX+":"+initialY);
							if(game.map.arrsqs[row][col]==self.obj){
							tem=game.map.map[trow][tcol];
							game.map.map[trow][tcol]=game.map.map[row][col];
							game.map.map[row][col]=tem;
							game.map.arrsqs[trow][tcol]=new Squares(arrsqs.x,arrsqs.y,arrsqs.x,arrsqs.y,game.map.map[trow][tcol]);
							game.map.arrsqs[row][col]=new Squares(initialX,initialY,initialX,initialY,game.map.map[row][col]);
							}
							self.onOff=false;
							//console.log(game.map.arrsqs);
							if(isrc){
								game.de.isrow=true;
								game.de.iscol=false;
								game.de.row=row;
								game.de.col=col;
								game.de.trow=trow;
								game.de.tcol=tcol;
							}else{
								game.de.iscol=true;
								game.de.isrow=false;
								game.de.row=row;
								game.de.col=col;
								game.de.trow=trow;
								game.de.tcol=tcol;
							}
							game.dm.state=1;
						}
					}
				}
				function move(event){
					event.preventDefault();
					if(event.touches){
						event.offsetX=event.touches[0].pageX-game.canvas.offsetLeft;
						event.clientX=event.touches[0].pageX;
						event.clientY=event.touches[0].pageY;
						event.offsetY=event.touches[0].pageY-game.canvas.offsetTop;
						//console.log(game.canvas.style.left);
						//console.log(game.canvas.style.top);
						touchX=event.offsetX;
						touchY=event.offsetY;
					}
					self.save=false;
					if(self.obj){
						if((event.clientX-game.canvas.offsetLeft)>0&&(event.clientX-game.canvas.offsetLeft)<game.canvas.width){
							if((event.clientY-game.canvas.offsetTop)>0&&(event.clientY-game.canvas.offsetTop)<game.canvas.height){
							self.obj.x=event.offsetX-game.map.w/2;
							self.obj.tx=event.offsetX-game.map.w/2;
							self.obj.y=event.offsetY-game.map.h/2;
							self.obj.ty=event.offsetY-game.map.h/2;

							}else{
							self.obj.x=initialX;
							self.obj.y=initialY;
							self.obj.tx=initialX;
							self.obj.ty=initialY;
							}
						}else{
							self.obj.x=initialX;
							self.obj.y=initialY;
							self.obj.tx=initialX;
							self.obj.ty=initialY;
						}
					}
				}
				function eventMove(event){
					event.preventDefault();
					if(event.touches){
						event.offsetX=event.touches[0].pageX-game.canvas.offsetLeft;
						event.offsetY=event.touches[0].pageY-game.canvas.offsetTop;
						//console.log(game.canvas.style.left);
						//console.log(game.canvas.style.top);
					}
					console.log(self.kg);
				if(self.kg){
					self.kg=false;
				self.onOff=true;
				for(var r=0;r<game.map.arrsqs.length;r++){
					for(var c=0;c<game.map.arrsqs[r].length;c++){
						if(game.map.arrsqs[r][c]&&event.offsetX>game.map.arrsqs[r][c].x&&event.offsetX<game.map.arrsqs[r][c].x+game.map.w){
							if(event.offsetY>game.map.arrsqs[r][c].y&&event.offsetY<game.map.arrsqs[r][c].y+game.map.h){
								//console.log(game.map.arrsqs[r][c]);
								self.obj=game.map.arrsqs[r][c];
								if(self.save){
									initialX=game.map.arrsqs[r][c].x;
									initialY=game.map.arrsqs[r][c].y;
									row=r;
									col=c;
									self.save=false;
								}
							}
						}
					}
				}
				window.addEventListener("mousemove",move);
				window.addEventListener("touchmove",move);
				window.addEventListener("mouseup",function(event){
					event.preventDefault();
					//console.log(initialX);
					//console.log("次数");
					if(self.testS!=row||self.testC!=col){
						
						if(row-1>-1&&game.map.arrsqs[row-1][col]){
							arrsqsObj(event,game.map.arrsqs[row-1][col],true);
						}
						if(row+1<game.map.arrsqs.length&&game.map.arrsqs[row+1][col]){
							arrsqsObj(event,game.map.arrsqs[row+1][col],true);
						}
						if(col+1<game.map.arrsqs[row].length&&game.map.arrsqs[row][col+1]){
							arrsqsObj(event,game.map.arrsqs[row][col+1],false);
						}
						if(col-1>-1&&game.map.arrsqs[row][col-1]){
							arrsqsObj(event,game.map.arrsqs[row][col-1],false);
						}
					}
					//console.log(1);
					if(self.onOff){
						self.obj.x=initialX;
						self.obj.y=initialY;
						self.obj.tx=initialX;
						self.obj.ty=initialY;
					}
					self.save=true;
					window.removeEventListener("mousemove",move);
					window.removeEventListener("touchmove",move);
					if(self.obj.x==initialX&&self.obj.y==initialY){
						setTimeout(function(){
							self.kg=true;
						},500);
					}
					self.testS=row;
					self.testC=col;
					row=0;
					col=0;
					window.removeEventListener("mouseup",this,false);
				},false);
				window.addEventListener("touchend",function(event){
					event.preventDefault();
					//console.log(initialX);
					//console.log("次数");
					//console.log(event.pageX);
					if(event.touches){
						event.offsetX=touchX;
						event.offsetY=touchY;
						//console.log(game.canvas.style.left);
						//console.log(game.canvas.style.top);
					}
					if(self.testS!=row||self.testC!=col){
						if(row-1>-1&&game.map.arrsqs[row-1][col]){
							arrsqsObj(event,game.map.arrsqs[row-1][col],true);
						}
						if(row+1<game.map.arrsqs.length&&game.map.arrsqs[row+1][col]){
							arrsqsObj(event,game.map.arrsqs[row+1][col],true);
						}
						if(col+1<game.map.arrsqs[row].length&&game.map.arrsqs[row][col+1]){
							arrsqsObj(event,game.map.arrsqs[row][col+1],false);
						}
						if(col-1>-1&&game.map.arrsqs[row][col-1]){
							arrsqsObj(event,game.map.arrsqs[row][col-1],false);
						}
					}
					//console.log(1);
					if(self.onOff){
						//console.log("cg");
						self.obj.x=initialX;
						self.obj.y=initialY;
						self.obj.tx=initialX;
						self.obj.ty=initialY;
					}
					self.save=true;
					window.removeEventListener("mousemove",move);
					window.removeEventListener("touchmove",move);
					if(self.obj.x==initialX&&self.obj.y==initialY){
						setTimeout(function(){
							self.kg=true;
						},500);
					}
					self.testS=row;
					self.testC=col;
					row=0;
					col=0;
					window.removeEventListener("touchend",this,false);
				},false);
				}
				}
			game.canvas.addEventListener("mousedown",eventMove,false);
			game.canvas.addEventListener("touchstart",eventMove,false);
			//console.log("on");
		}
	});
})();