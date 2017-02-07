/*
* @Author: Administrator
* @Date:   2016-07-29 20:58:29
* @Last Modified by:   Administrator
* @Last Modified time: 2016-07-31 17:47:24
*/

'use strict';
(function(){
	window.Successful=Class.extend({
		init:function(){
			this.startArr=[];
			this.startsqsArr=[];
		},
		finish:function(){
			var self=this;
			//console.log(game.de.closeArr);
			game.de.closeArr.forEach(function(e){
				if(e.row-1>-1){
					for(var i=e.row-1;i>=0;i--){
						if(i>-1){
							if(game.map.map[i][e.col]>-1){
								self.startArr.push(game.map.map[i][e.col]);
								self.startsqsArr.push(game.map.arrsqs[i][e.col].y);
							}else{
								self.startArr.push(Math.floor(Math.random()*5));
							}
						}
					}
					for(var j=e.row;j>=0;j--){
						if(j-1>-1){
							if(self.startArr.length>0){
								//console.log((self.startArr.length-1)-(j-1));
								//console.log(self.startArr.length);
								if(self.startArr[((self.startArr.length-1)-(j-1))]>-1&&self.startArr[((self.startArr.length-1)-(j-1))]<5){
									game.map.map[j][e.col]=self.startArr[((self.startArr.length-1)-(j-1))];
									game.map.arrsqs[j][e.col]=new Squares(e.col*game.map.w,j*game.map.h,e.col*game.map.w,j*game.map.h,game.map.map[j][e.col]);
								}else{
									//game.map.map[j][e.col]=self.startArr[((self.startArr.length-1)-(j-1))];
									//game.map.arrsqs[j][e.col]=new Squares(e.col*game.map.w,j*game.map.h,e.col*game.map.w,j*game.map.h,game.map.map[j][e.col]);
									console.log("bug长度减一:"+(self.startArr.length-1));
									console.log("bugJ-1:"+(j-1));
									console.log("bug:"+self.startArr[(self.startArr.length-1)-(j-1)]);
									console.log("bug角标:"+((self.startArr.length-1)-(j-1)));
									console.log("bugE:"+e.col+"and"+e.row);
									console.log("bugJ:"+j);
								}
							}else{
								if(e.row>0){
									game.map.map[e.row][e.col]=Math.floor(Math.random()*5);
									game.map.arrsqs[e.row][e.col]=new Squares(e.col*game.map.w,e.row*game.map.h,e.col*game.map.w,e.row*game.map.h,game.map.map[e.row][e.col]);
									break;
								}
							}
						}else{
							game.map.map[j][e.col]=-1;
							game.map.arrsqs[j][e.col]=null;
						}

					}
				}
				game.map.map[0][e.col]=Math.floor(Math.random()*5);
				game.map.arrsqs[0][e.col]=new Squares(e.col*game.map.w,-50,e.col*game.map.w,0,game.map.map[0][e.col]);
				self.startArr=[];
				self.startsqsArr=[];
			});
			//console.log(1);
			game.score.update();
			game.de.closeArr=[];
			game.de.isrow=false;
			game.de.iscol=false;
			game.dm.state=1;
		}
	});
})();