/*
* @Author: Administrator
* @Date:   2016-07-22 23:11:40
* @Last Modified by:   Administrator
* @Last Modified time: 2016-07-26 12:23:32
*/

'use strict';
window.CellBlockManage=Class.extend({
	init:function(col,row){
		this.col=col;
		this.row=row;
		this._shape=["I","L","J","L","Z","T","O"];
		this._random=Math.floor(Math.random()*7);
		this.state=0;
		this.speed=20;
		this.sonOff=false;
		this.lonOff=false;
		this.ronOff=false;
		//this._random=1;
		this.cellblock={
				I:[
					["0010","0010","0010","0010"],
					["0000","1111","0000","0000"]
				],
				L:[
					["0100","0100","0110","0000"],
					["0000","1110","1000","0000"],
					["1100","0100","0100","0000"],
					["0010","1110","0000","0000"]
				],
				J:[
					["0100","0100","1100","0000"],
					["1000","1110","0000","0000"],
					["0110","0100","0100","0000"],
					["0000","1110","0010","0000"]
				],
				Z:[
					["0000","1100","0110","0000"],
					["0100","1100","1000","0000"]
				],
				T:[
					["0000","1110","0100","0000"],
					["0100","1100","0100","0000"],
					["0100","1110","0000","0000"],
					["0100","0110","0100","0000"]
				],
				O:[
					["0110","0110","0000","0000"]
				]
			};
			this.createInstance();
			/*
			this.instance=[
				[null,null,null,null],
				[null,null,null,null],
				[null,null,null,null],
				[null,null,null,null]
			];*/
			this.moveEvent();
		},
		createInstance:function(){
			this.instance=[
				[null,null,null,null],
				[null,null,null,null],
				[null,null,null,null],
				[null,null,null,null]
			];
			for(var i=0;i<this.cellblock[this._shape[this._random]][this.state].length;i++){
				var length=this.cellblock[this._shape[this._random]][this.state][i].length;
				for(var j=0;j<length;j++){
					var num=this.cellblock[this._shape[this._random]][this.state][i].substr(j,1);
					if(num!=0){
						this.instance[i][j]=new CellBlock(this.col+j*game.map.w,this.row+i*game.map.h,this._random);
						//console.log(game.canvas.width);
					}
				}

			}
		},
		eventFn:function(event,self){
				//console.log(event.keyCode);
				//上键：38
				//下键：40
				//向左：37
				//向右：39
				//console.log(event.keyCode);
				//向上换状态
				if(event.keyCode==40||event._down){
					if(event._down){
						event._down=false;
					}
					if(!self.sonOff){
						if(self.state==self.cellblock[self._shape[self._random]].length-1){
							self.state=0;
							self.createInstance();
						}else{
							self.state++;
							self.createInstance();
						}
					}
				}
				//向左移动
				if(event.keyCode==37||event._left){
					if(event._left){
						event._left=false;
					}
					if(!self.ronOff){
						self.lonOff=false;
						self.sonOff=false;
						self.col-=game.map.w;
						self.createInstance();
					}
				}
				//向右移动
				if(event.keyCode==39||event._right){
					if(event._right){
						event._right=false;
					}
					if(!self.lonOff){
						//console.log(1);
						self.ronOff=false;
						self.sonOff=false;
						self.col+=game.map.w;
						self.createInstance();
					}	
				}
				//向下换状态
				if(event.keyCode==38||event._up){
					if(event._up){
						event._up=false;
					}					
					if(!self.sonOff){
						if(self.state<=0){
							self.state=self.cellblock[self._shape[self._random]].length-1;
							self.createInstance();
						}else{
							self.state--;
							self.createInstance();
						}
					}
				}
		},
		moveEvent:function(){
			var self=this;
			window.addEventListener("keyup",function(event){
				self.eventFn(event,self);
			});
		},
		allRender:function(){
			if(game.ifs.iframefps%this.speed==0){
				this.row+=game.map.h;
				this.createInstance();
			}
			for(var r=0;r<this.instance.length;r++){
				for(var c=0;c<this.instance[r].length;c++){
					this.instance[r][c]&&this.instance[r][c].render();
				}
			}
		}
});