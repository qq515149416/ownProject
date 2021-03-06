(function(){
	loadImages=Class.extend({
		init:function(){
			this.aloaded=0;
			this.image={};
		},
		loadsources:function(json,callback){
			var self=this;
			var xhr=new XMLHttpRequest();
			//alert(1);
			xhr.onreadystatechange=function(){
				//alert(1);
				if(xhr.readyState==4){
					//alert(1);
					if(xhr.status>=200&&xhr.status<400){
						//alert(1);
						var oImages=JSON.parse(xhr.responseText);
						for(var i=0;i<oImages.image.length;i++){
							var image=new Image();
							image.src=oImages.image[i].src;
							image.index=i;
							image.onload=function(){
								self.aloaded++;
								self.image[oImages.image[this.index].name]=this;
								callback(self.aloaded,oImages.image.length,self.image);
							}
						}
					}
				}
			}
			xhr.open("get",json,true);
			xhr.send();
		}
	});
})();