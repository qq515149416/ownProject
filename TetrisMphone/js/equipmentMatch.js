/*
* @Author: Administrator
* @Date:   2016-07-25 16:36:41
* @Last Modified by:   Administrator
* @Last Modified time: 2016-07-26 12:12:38
*/

'use strict';
(function(){
	window.equipmentMatch=Class.extend({
		init:function(){
			this._left=false;
			this._right=false;
			this._up=false;
			this._down=false;
			this.mpui={
				l:new MobilePhoneUI(100,game.canvas.height-30,"右"),
				r:new MobilePhoneUI(200,game.canvas.height-30,"左"),
				u:new MobilePhoneUI(450,game.canvas.height-30,"上"),
				d:new MobilePhoneUI(550,game.canvas.height-30,"下")
			};
			this.onck();
		},
		render:function(){
			this.mpui.l.render();
			this.mpui.r.render();
			this.mpui.u.render();
			this.mpui.d.render();
		},
		onck:function(){
			var self=this;
			game.canvas.addEventListener("mousedown",function(event){
				//按左键
				if(event.offsetX>self.mpui.l.x-self.mpui.l.r&&event.offsetX<self.mpui.l.x+self.mpui.l.r){
					if(event.offsetY>self.mpui.l.y-self.mpui.l.r&&event.offsetX<self.mpui.l.y+self.mpui.l.r){
						self._left=true;
						game.cbm.eventFn(self,game.cbm);
					}
				}
				//按右键
				if(event.offsetX>self.mpui.r.x-self.mpui.l.r&&event.offsetX<self.mpui.r.x+self.mpui.r.r){
					if(event.offsetY>self.mpui.r.y-self.mpui.l.r&&event.offsetX<self.mpui.r.y+self.mpui.r.r){
						self._right=true;
						game.cbm.eventFn(self,game.cbm);
					}
				}
				//按下键
				if(event.offsetX>self.mpui.u.x-self.mpui.l.r&&event.offsetX<self.mpui.u.x+self.mpui.u.r){
					if(event.offsetY>self.mpui.u.y-self.mpui.l.r&&event.offsetX<self.mpui.u.y+self.mpui.u.r){
						self._up=true;
						game.cbm.eventFn(self,game.cbm);
					}
				}
				//按上键
				if(event.offsetX>self.mpui.d.x-self.mpui.l.r&&event.offsetX<self.mpui.d.x+self.mpui.d.r){
					if(event.offsetY>self.mpui.d.y-self.mpui.l.r&&event.offsetX<self.mpui.d.y+self.mpui.d.r){
						self._down=true;
						game.cbm.eventFn(self,game.cbm);
					}
				}
			});
		}
	});
})();