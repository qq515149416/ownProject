(function(){
	Pipe=Class.extend({
		init:function(){
			this.state=_.random(0,1);
			this.h=_.random(100,game.canvas.height/2);
			this.w=148;
			this.x=game.canvas.width;
			this.y=this.state==0?game.canvas.height-this.h-48:0;
			this.speed=3;
			this.pd=true;
		},
		update:function(){
			if(game.atlas.bird.x+game.atlas.bird.w>this.x&&game.atlas.bird.x<this.x+this.w){
					if(this.state==0){
						if(game.atlas.bird.y+game.atlas.bird.h+10>this.y){
							game.atlas.bird.die=true;
							game.gameover();
						}
					}else if(this.state==1){
						if(game.atlas.bird.y-10<this.y+this.h){
							game.atlas.bird.die=true;
							game.gameover();
						}
					}
			}
			this.x-=this.speed;
			if(this.x<game.atlas.bird.x&&this.pd){
				game.atlas.scoring.plus();
				this.pd=false;
			}
			if(this.x<-this.w){
				var temp=_.without(game.aggregate,this);
			}
		},
		render:function(){
			if(this.state==0){
				game.oc.drawImage(game.image["pipe"+this.state],0,0,this.w,this.h,this.x,this.y,this.w,this.h);
			}else if(this.state==1){				
				game.oc.drawImage(game.image["pipe"+this.state],0,1664-this.h,this.w,this.h,this.x,this.y,this.w,this.h);
			}
		}
	});
})();