(function(){
	Scoring=Class.extend({
		init:function(){
			this.scor=0;
			this.x=(game.canvas.width/2)-(40/2);
			this.y=200;
		},
		plus:function(){
			this.scor++;
		},
		render:function(){
			var digit=this.scor.toString().length;
			var bp=game.canvas.width/2-digit*40/2;
			for(var i=0;i<digit;i++){
				var scoring=this.scor.toString().charAt(i);
				game.oc.drawImage(game.image.number,scoring*40,0,40,57,bp+i*40,this.y,40,57);
			}
		}
	});
})();