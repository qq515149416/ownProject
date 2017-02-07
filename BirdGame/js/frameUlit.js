(function(){
	frameUilt=Class.extend({
		init:function(){
			this.currentframe=0;
			this.sTime=new Date();
			this.framefps=0;
			this.fps=0;
		},
		update:function(){
			this.currentframe++;
		},
		fpsreal:function(){
			var t=new Date();
			if(t-this.sTime>=1000){
				this.fps=this.currentframe-this.framefps;
				this.framefps=this.currentframe;
				this.sTime=t;
			}
		}
	});
})()