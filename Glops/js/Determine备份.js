/*
* @Author: Administrator
* @Date:   2016-07-28 11:58:12
* @Last Modified by:   Administrator
* @Last Modified time: 2016-08-02 11:06:21
*/

'use strict';
(function(){
	window.Determine=Class.extend({
		init:function(){
			this.isrow=false;
			this.iscol=false;
			this.row=0;
			this.col=0;
			this.trow=0;
			this.tcol=0;
			this.num=0;
			this.closeArr=[];
		},
		operation:function(){
			var self=this;
			function ct(selfX,selfY,nextX,nextY,isrow){
				var target=0;
				var next=0;
				if(isrow){
					target=game.map.map[selfX][selfY+1];
					next=game.map.map[nextX][nextY+1];
				}else{
					target=game.map.map[selfX+1][selfY];
					next=game.map.map[nextX+1][nextY];
				}
				if(target==next){
					self.num++;
					ct(selfX+1,selfY+1,nextX+1,nextY+1,isrow)
				}else{
					if(isrow){
						return selfY;
					}else{
						return selfX;
					}
				}
			}
			if(this.isrow){
				for(var i=0;i<game.map.map[this.row].length;i++){
					if(game.map.map[this.row][i]==game.map.map[this.row][i+1]){
						this.num++;
						if(this.num>=2){
							//var n=ct(this.row,i,this.row,i+1,true);
							for(var j=this.num;j>-1;j--){
								//console.log(game.map.map[this.row][i-j]);
								game.map.map[this.row][(i+1)-j]=-1;
								game.map.arrsqs[this.row][(i+1)-j]=null;
								this.closeArr.push({row:this.row,col:(i+1)-j});
							}
							this.num=0;
						}
					}else{
						this.num=0;
					}
				}
				for(var i=0;i<game.map.map[this.trow].length;i++){
					if(game.map.map[this.trow][i]==game.map.map[this.trow][i+1]){
						this.num++;
						if(this.num>=2){
							//ct(i,this.trow,true);
							for(var j=this.num;j>-1;j--){
								//console.log(game.map.map[this.trow][(i+1)-j]);
								game.map.map[this.trow][(i+1)-j]=-1;
								game.map.arrsqs[this.trow][(i+1)-j]=null;
								this.closeArr.push({row:this.trow,col:(i+1)-j});
								//console.log(game.map.map);
								//console.log(game.map.arrsqs);
							}
							this.num=0;
						}
						//console.log(this.num);
					}else{
						this.num=0;
					}
				}
				for(var i=0;i<game.map.map.length;i++){
					//console.log(game.map.map[10][this.col]);
						if(i+1<game.map.map.length){
							if(game.map.map[i][this.col]>-1&&game.map.map[i][this.col]==game.map.map[i+1][this.col]){
								this.num++;
								if(this.num>=2){
									//ct(i,this.col,false);
									for(var j=this.num;j>-1;j--){
										//console.log(game.map.map[(i+1)-j][this.col]);
										game.map.map[(i+1)-j][this.col]=-1;
										game.map.arrsqs[(i+1)-j][this.col]=null;
										this.closeArr.push({row:(i+1)-j,col:this.col});
										//console.log(game.map.map);
										//console.log(game.map.arrsqs);
									}
									this.num=0;
								}
								//console.log(this.num);
							}else{
								this.num=0;
							}
						}

				}
				if(this.closeArr.length>0){
					game.dm.state=2;
				}else{
					game.re.row=this.row;
					game.re.col=this.col;
					game.re.trow=this.trow;
					game.re.tcol=this.tcol;
					game.re.onOff=true;
					game.dm.state=3;
				}
			}else if(this.iscol){
				for(var i=0;i<game.map.map.length;i++){
					//console.log(game.map.map[10][this.col]);
						if(i+1<game.map.map.length){
							if(game.map.map[i][this.col]>-1&&game.map.map[i][this.col]==game.map.map[i+1][this.col]){
								this.num++;
								if(this.num>=2){
									//ct(i,this.col,false);
									for(var j=this.num;j>-1;j--){
										//console.log(game.map.map[(i+1)-j][this.col]);
										game.map.map[(i+1)-j][this.col]=-1;
										game.map.arrsqs[(i+1)-j][this.col]=null;
										this.closeArr.push({row:(i+1)-j,col:this.col});
										//console.log(game.map.map);
										//console.log(game.map.arrsqs);
									}
									this.num=0;
								}
								//console.log(this.num);
							}else{
								this.num=0;
							}
						}

				}
				for(var i=0;i<game.map.map.length;i++){
					//console.log(game.map.map[10][this.tcol]);
						if(i+1<game.map.map.length){
							if(game.map.map[i][this.tcol]>-1&&game.map.map[i][this.tcol]==game.map.map[i+1][this.tcol]){
								this.num++;
								if(this.num>=2){
									//ct(i,this.tcol,false);
									for(var j=this.num;j>-1;j--){
										if(i>0){
											game.map.map[(i+1)-j][this.tcol]=-1;
											game.map.arrsqs[(i+1)-j][this.tcol]=null;
											this.closeArr.push({row:(i+1)-j,col:this.tcol});
										}
										//console.log(game.map.map);
										//console.log(game.map.arrsqs);
									}
									this.num=0;
								}
								//console.log(this.num);
							}else{
								this.num=0;
							}
						}

				}
				for(var i=0;i<game.map.map[this.row].length;i++){
					if(game.map.map[this.row][i]>-1&&game.map.map[this.row][i]==game.map.map[this.row][i+1]){
						this.num++;
						if(this.num>=2){
							//ct(i,this.row,true);
							for(var j=this.num;j>-1;j--){
								//console.log(game.map.map[this.row][i-j]);
								game.map.map[this.row][(i+1)-j]=-1;
								game.map.arrsqs[this.row][(i+1)-j]=null;
								this.closeArr.push({row:this.row,col:(i+1)-j});
							}
							this.num=0;
						}
					}else{
						this.num=0;
					}
				}
				if(this.closeArr.length>0){
					game.dm.state=2;
				}else{
					game.re.row=this.row;
					game.re.col=this.col;
					game.re.trow=this.trow;
					game.re.tcol=this.tcol;
					game.re.onOff=true;
					game.dm.state=3;
				}
			}else{
				//console.log("z");
				for(var i=0;i<game.map.map.length;i++){
					for(var x=0;x<game.map.map[i].length;x++){
					if(game.map.map[i][x]>-1&&game.map.map[i][x]==game.map.map[i][x+1]){
						this.num++;
						if(this.num>=2){
							//ct(x,i,true);
							for(var j=this.num;j>-1;j--){
								//console.log(game.map.map[i][x-j]);
								game.map.map[i][(x+1)-j]=-1;
								game.map.arrsqs[i][(x+1)-j]=null;
								this.closeArr.push({row:i,col:(x+1)-j});
							}
							this.num=0;
						}
					}else{
						this.num=0;
					}
					}
				}
				for(var i=0;i<game.map.map.length;i++){
					for(var x=0;x<game.map.map[i].length;x++){
					if(x+1<game.map.map.length){
						if(game.map.map[x][i]>-1&&game.map.map[x][i]==game.map.map[x+1][i]){
							this.num++;
							if(this.num>=2){
								//ct(x,i,false);
								for(var j=this.num;j>-1;j--){
									if(x>0){
										game.map.map[(x+1)-j][i]=-1;
										game.map.arrsqs[(x+1)-j][i]=null;
										this.closeArr.push({row:(x+1)-j,col:i});
									}
								}
								this.num=0;
							}
						}else{
							this.num=0;
						}
					}
					}
				}
				if(this.closeArr.length>0){
					game.dm.state=2;
				}else{
					game.dm.state=3;
				}
			}
		}
	});
})();