/*
* @Author: Administrator
* @Date:   2016-07-27 17:35:49
* @Last Modified by:   Administrator
* @Last Modified time: 2016-08-02 17:25:19
*/

'use strict';
(function(){
	window.DecisionMakers=Class.extend({
		init:function(){
			this.state=0;//状态码：0为等待用户操作1为判断中2为判断成功3为判断失败
		},
		choose:function(){
			switch(this.state){
				case 0:
					//console.log(1);
				break;
				case 1:
					game.de.operation();
					game.me.kg=false;
				break;
				case 2:
					game.sf.finish();
					game.me.kg=false;
				break;
				case 3:
					game.me.kg=false;
					game.re.exchange();
				break;
			}
		}
	});
})();