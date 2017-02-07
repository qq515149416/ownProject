/**
 * Created by Administrator on 2016/10/17.
 */
window.evti={};
window.evti.addTransitionEnd=function(dom,callback) {
    if(dom&&typeof dom=="object") {
        dom.addEventListener("webkitTransitionEnd",function() {
            callback && callback();
        });
        dom.addEventListener("transitionEnd",function() {
            callback && callback();
        });
    }
}
window.evti.tap = function(dom,callbrak) {
    var isMove=false;
    var startTime=0;
    dom.addEventListener("touchstart",function(e) {
        startTime=Date.now();
    });
    dom.addEventListener("touchmove",function(e) {
       isMove=true;
    });
    dom.addEventListener("touchend",function(e) {
       if((Date.now()-startTime)<150&&!isMove) {
           callbrak && callbrak(e);
       }
        isMove=false;
        startTime=0;
    });
}