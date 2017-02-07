(function(){
	background=Class.extend({
		init:function(json){
			this.image=json.image;
			this.width=json.width;
			this.height=json.height;
			this.speed=json.speed;
			this.y=json.y;
			this.x=0;
			this.count=parseInt(game.canvas.width/this.width)+1;
		},
		update:function(){
			this.x-=this.speed;
			if(this.x<(-game.canvas.width)){
				this.x=0;
			}
		},
		render:function(){
			for(var i=0;i<this.count*2;i++){
				game.oc.drawImage(this.image,0,0,this.width,this.height,this.x+this.width*i,this.y,this.width,this.height);
			}
		}
	});
})();