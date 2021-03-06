(function(){
	management=Class.extend({
		init:function(){
			this.agg=[{"image":game.image.bg1,"width":300,"height":256,"speed":2,"y":game.canvas.height-256-48},
				{"image":game.image.bg2,"width":300,"height":216,"speed":2,"y":game.canvas.height-216-48},
				{"image":game.image.bg3,"width":48,"height":48,"speed":3,"y":game.canvas.height-48}];
			this.bgs=[];
			for(var i=0;i<this.agg.length;i++){
				this.bgs.push(new background(this.agg[i]));
			}
			this.bird=new Bird();
			this.scoring=new Scoring();
			this.gameend=false;
		},
		updateAll:function(){
			if(!this.gameend){
				this.bgs.forEach(function(obj){
					obj.update();
				});
				game.aggregate.forEach(function(obj){
					obj.update();
				});
			}
			this.bird.update();
		},
		renderAll:function(){
			this.bgs.forEach(function(obj){
				obj.render();
			});
			game.aggregate.forEach(function(obj){
				obj.render();
			});
			this.bird.render();
			this.scoring.render();
		}
	});
})();