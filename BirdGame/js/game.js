(function(){
	Game=Class.extend({
		init:function(json){
			this.timer=null;
			var self=this;
			//this.tp=[];
			this.fps=json.fps;
			this.canvas=document.getElementById(json.id);
			this.oc=this.canvas.getContext("2d");
			this.fl=new frameUilt();
			this.aggregate=[];
			this.interval=100;
			this.image=null;
			this.loadimages=new loadImages();
			this.loadimages.loadsources("js/r.json",function(cnumber,total,imageObject){
				if(cnumber==total){
					self.image=imageObject;
					self.run();
				}
			});
		},
		run:function(){
			var self=this;
			this.atlas=new management();
			self.timer=setInterval(function(){
				self.mainloop();
				if(self.fl.currentframe%self.interval==0){
					self.aggregate.push(new Pipe());
				}
			},1000/self.fps);
		},
		mainloop:function(){
			this.oc.clearRect(0,0,this.canvas.width,this.canvas.height);
			this.fl.fpsreal();
			this.fl.update();
			this.oc.fillText("fps:"+this.fl.currentframe,10,10);
			this.oc.fillText("fps:"+this.fl.fps,10,20);
			this.atlas.updateAll();
			this.atlas.renderAll();
			if(this.atlas.bird.y>this.canvas.height-48-this.atlas.bird.h){
				this.atlas.bird.die=true;
				this.gameover();
			}else if(this.atlas.bird.y<0){
				console.log(this.atlas.bird.dY);
				this.atlas.bird.state=0;
			}
			//this.oc.drawImage(this.image.pipe0,100,100);
		},
		stop:function(){
			clearInterval(this.timer);
		},
		gameover:function(){
			this.atlas.gameend=true;
		}
	});
})()