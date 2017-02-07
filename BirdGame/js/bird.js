(function(){
	Bird=Class.extend({
		init:function(){
			this.image=game.image.bird;
			this.x=100;
			this.y=100;
			this.w=85;
			this.h=60;
			this.swing=0;
			this.front=game.fl.currentframe;
			this.dY=0;
			this.ro=0;
			this.state=0;
			this.disY=1;
			this.speed=5;
			this.die=false;
			this.dieX=0;
			this.dieY=0;
			this.num=0;
			this.binkClickListener();
		},
		update:function(){
			if(this.die){
				this.num++;
				if(this.num>30){
					return;
				}
			}else{
				if((game.fl.currentframe%this.speed)==0){
					this.swing++;
					if(this.swing==2){
						this.swing=0;
					}
				}
				if(this.state==0){
					this.speed=5;
					this.ro++;
					if(this.ro>=50){
						this.ro=50;
					}
					this.dY=0.02*Math.pow(game.fl.currentframe-this.front,2);
				}else if(this.state==1){
					var now=this.y-(this.oly-50);
					this.speed=2;
					//this.y-=5;
					this.ro-=30;
					//console.log(now);
					if(this.ro<=-25){
						this.ro=-25;
					}
					if(now<=0){
						this.disY=1;
						this.state=0;
						this.front=game.fl.currentframe;
					}
					this.disY++;
					this.dY=-20+this.disY;
				}
				this.y+=this.dY;
			}
		},
		render:function(){
			if(this.die){
				this.dieX=this.num%5;
				this.dieY=Math.floor(this.num/5);
				game.oc.drawImage(game.image.blood,this.dieX*325,this.dieY*138,325,138,this.x-this.w,this.y+this.h,325,165);
				return;
			}else{
				game.oc.save();
				game.oc.translate(this.x+this.w/2,this.y+this.h/2);
				game.oc.rotate((Math.PI/180)*this.ro);
				game.oc.translate(-(this.x+this.w/2),-(this.y+this.h/2));
				game.oc.drawImage(this.image,this.swing*this.w,0,this.w,this.h,this.x,this.y,this.w,this.h);
				game.oc.restore();
			}
		},
		binkClickListener:function(){
			var self=this;
			game.canvas.addEventListener("mousedown",function(){
				self.state=1;
				self.oly=self.y;
			});
			game.canvas.addEventListener("touchstart",function(e){
				var oEvent=e||event;
				oEvent.preventDefault();
				self.state=1;
				self.oly=self.y;
			});
		}
	});
})();