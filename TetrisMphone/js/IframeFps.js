/*
* @Author: Administrator
* @Date:   2016-07-23 22:29:35
* @Last Modified by:   Administrator
* @Last Modified time: 2016-07-23 22:32:51
*/

'use strict';
(function(){
	window.IframeFps=Class.extend({
		init:function(){
			this.iframefps=0;
		},
		update:function(){
			this.iframefps++;
		}
	});
})();