/**
 * Created by Administrator on 2016/10/19.
 */
window.onload = function() {
    leftmenu();
    rightcon();
}
/*右侧菜单*/
function leftmenu() {
    /*
    * 1.让菜单能滑动
    * 2.滑动时需要有区间限制 当滑动到一定程度时不能再滑动（这个区间是加上缓冲值的）
    * 3.当手指离开时判断如果超过了最大或者最小限制就吸附回去
    * 4.点击菜单的选项时需要让当前选项更换样式并且让当前选项置顶
    * 5.判断让当前选项置顶是否会超过最小或者最大限制如果超过就不能让当前选项置顶
    * */

    var parentBox=document.querySelector(".category-left");
    var childBox=parentBox.querySelector("ul");
//    最大限制
    var maxY=0;
//    最小限制
    var minY=parentBox.offsetHeight-childBox.offsetHeight;
//    缓冲距离
    var buffer=100;
//    滑动最大限制
    var maxSlide=maxY+buffer;
//    滑动最小限制
    var minSlide=minY-buffer;
    /*第一步 1.让菜单能滑动*/
//    开始滑动的坐标
    var startY=0;
//    滑动中的坐标
    var moveY=0;
//    要移动的坐标
    var record=0;
//    保存上一次滑动过的位置
    var currY=0;
    parentBox.addEventListener("touchstart",function(e) {
        startY= e.touches[0].clientY;
    });
    parentBox.addEventListener("touchmove",function(e) {
        isMove=true;
        moveY= e.touches[0].clientY;
        record=moveY-startY;
    /*判断是否在有效值范围内*/
//        console.log((currY+record));
//        console.log(maxSlide);
//        console.log(minSlide);
        /*第二步 2.滑动时需要有区间限制 当滑动到一定程度时不能再滑动（这个区间是加上缓冲值的）*/
        if((currY+record)<maxSlide&&(currY+record)>minSlide) {
            setTransform(currY+record);
        }
    });
    window.addEventListener("touchend",function() {
        /*第三步 3.当手指离开时判断如果超过了最大或者最小限制就吸附回去*/
        if((currY+record)>maxY) {
            currY=maxY;
            addTransition();
            setTransform(maxY);
        }else if((currY+record)<minY) {
            currY=minY;
            addTransition();
            setTransform(minY);
        }else {
            currY+=record;
        }
        startY=0;
        moveY=0;
        record=0;
    });
    /*第四步 4.点击菜单的选项时需要让当前选项更换样式并且让当前选项置顶*/
    var lis=childBox.querySelectorAll("li");
    evti.tap(childBox,function(e) {
        var li=e.target.parentNode;
        /*清除所有li的样式*/
        for(var i=0;i<lis.length;i++) {
            lis[i].className=" ";
            lis[i].index=i;
        }
        /*把当前点击的li样式设置为current*/
        li.className="current";
        /*第五步 5.判断让当前选项置顶是否会超过最小或者最大限制如果超过就不能让当前选项置顶*/
        var translateY=-li.index*li.offsetHeight;
        if(translateY>minY) {
            currY=translateY;
            addTransition();
            setTransform(currY);
        }else {
            currY=minY;
            addTransition();
            setTransform(currY);
        }
    });
    var addTransition=function() {
        childBox.style.webkitTransition="all 0.3s";
        childBox.style.transition="all 0.3s";
    }
    var removeTransition=function() {
        childBox.style.webkitTransition="none";
        childBox.style.transition="none";
    }
    var setTransform=function(y) {
        childBox.style.webkitTransform="translateY("+y+"px)";
        childBox.style.transform="translateY("+y+"px)";
    }
 }
/*左侧内容*/
function rightcon() {
    var parentBox=document.querySelector(".category-main");
    var childBox=parentBox.querySelector(".childbox");
//    最大限制
    var maxY=0;
//    最小限制
    var minY=parentBox.offsetHeight-childBox.offsetHeight;
//    缓冲距离
    var buffer=100;
//    滑动最大限制
    var maxSlide=maxY+buffer;
//    滑动最小限制
    var minSlide=minY-buffer;
    /*第一步 1.让菜单能滑动*/
//    开始滑动的坐标
    var startY=0;
//    滑动中的坐标
    var moveY=0;
//    要移动的坐标
    var record=0;
//    保存上一次滑动过的位置
    var currY=0;
    parentBox.addEventListener("touchstart",function(e) {
        startY= e.touches[0].clientY;
    });
    parentBox.addEventListener("touchmove",function(e) {
        isMove=true;
        moveY= e.touches[0].clientY;
        record=moveY-startY;
        /*判断是否在有效值范围内*/
//        console.log((currY+record));
//        console.log(maxSlide);
//        console.log(minSlide);
        /*第二步 2.滑动时需要有区间限制 当滑动到一定程度时不能再滑动（这个区间是加上缓冲值的）*/
        if((currY+record)<maxSlide&&(currY+record)>minSlide) {
            setTransform(currY+record);
        }
    });
    window.addEventListener("touchend",function() {
        /*第三步 3.当手指离开时判断如果超过了最大或者最小限制就吸附回去*/
        if((currY+record)>maxY) {
            currY=maxY;
            addTransition();
            setTransform(maxY);
        }else if((currY+record)<minY) {
            currY=minY;
            addTransition();
            setTransform(minY);
        }else {
            currY+=record;
        }
        startY=0;
        moveY=0;
        record=0;
    });
    var addTransition=function() {
        childBox.style.webkitTransition="all 0.3s";
        childBox.style.transition="all 0.3s";
    }
    var removeTransition=function() {
        childBox.style.webkitTransition="none";
        childBox.style.transition="none";
    }
    var setTransform=function(y) {
        childBox.style.webkitTransform="translateY("+y+"px)";
        childBox.style.transform="translateY("+y+"px)";
    }
}