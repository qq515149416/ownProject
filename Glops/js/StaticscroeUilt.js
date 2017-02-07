/*
* @Author: Administrator
* @Date:   2016-07-16 12:17:51
* @Last Modified by:   Administrator
* @Last Modified time: 2016-08-02 18:10:48
*/

'use strict';
(function(){
	window.ImageManage=Class.extend({
		init:function(){
			this.image={};
			this.resources={
					"images":[
					{"name":"butterfly","image":"images/butterfly.png"},
					{"name":"dog","image":"images/dog.png"},
					{"name":"rabbit","image":"images/rabbit.png"},
					{"name":"tiger","image":"images/tiger.png"},
					{"name":"pig","image":"images/pig.png"}
	]
			};
		},
		loadImages:function(json,callBack){
			var self=this;
			var allNumber=0;
			var currNumber=0;
			var xtr=new XMLHttpRequest();
			xtr.onreadystatechange=function(){
				if(xtr.readyState==4){
					if(xtr.status>=200&&xtr.status<400){
						var oImage=JSON.parse(xtr.responseText);
						allNumber=oImage.images.length;
						for(var i=0;i<oImage.images.length;i++){
							var images=new Image();
							images.index=i;
							images.src=oImage.images[i].image;
							images.onload=function(){
								self.image[oImage.images[this.index].name]=this;
								currNumber++;
								callBack(allNumber,currNumber,self.image);
							}

						}
					}else{
						var oImage=self.resources;
						allNumber=oImage.images.length;
						for(var i=0;i<oImage.images.length;i++){
							var images=new Image();
							images.index=i;
							images.src=oImage.images[i].image;
							images.onload=function(){
								self.image[oImage.images[this.index].name]=this;
								currNumber++;
								callBack(allNumber,currNumber,self.image);
							}

						}
					}
				}
			}
			xtr.open("get",json,true);
			xtr.send();
		}
	});
})();