/**
 * Created by Administrator on 2016/10/16.
 */
window.onload = function() {
    search();
//    banner();
    banner2();
    countdown();
}
/*搜索栏*/
function search() {
    var searchBox=document.querySelector(".jd-header-box");
//    console.log(searchBox);
    var banner=document.querySelector(".jd-banner");
    var height=banner.offsetHeight;
    var opacity=0;
    window.onscroll = function() {
       var top=window.pageYOffset;
        if(top>height) {
            opacity=0.8;
        }else {
            opacity=(top/height)*0.8;
        }
        searchBox.style.background="rgba(201,21,35,"+opacity+")";
    }
}
/*banner轮播*/
/*function banner() {
    var index=1;
    var imagesBox=document.querySelector(".jd-banner");
    var ulImg=imagesBox.querySelector("ul:nth-child(1)");
    var point=imagesBox.querySelector("ul:nth-child(2)");
    var points=point.querySelectorAll("li");
    var width=imagesBox.offsetWidth;
    createNode(ulImg);
    ulImg.style.transform="translate("+-width+"px)";
    var timer=setInterval(function() {
        index++;
        addTransition();
        setPosition(-index*width);

    },1000);
    evti.addTransitionEnd(ulImg,function() {
        if(index>=9) {
            index=1;
            removeTransition();
            setPosition(-index*width);
        }else if(index<=0){
            index=8;
            removeTransition();
            setPosition(-index*width);
        }
        setPoint();
    });
    var startX=0;
    var moveX=0;
    var record=0;
    var isMove=false;
    imagesBox.addEventListener("touchstart",function(e) {
        startX= e.touches[0].clientX;
        clearInterval(timer);
    });
    imagesBox.addEventListener("touchmove",function(e) {
        isMove=true;
        moveX= e.touches[0].clientX;
        record=startX-moveX;
       removeTransition();
        setPosition(-index*width-record);
    })
    imagesBox.addEventListener("touchend",function(e) {
        if(Math.abs(record)>(width/3)) {
            if(record>0) {
//            下一张
                index++;
            }else{
//           上一张
                index--;
            }
            addTransition();
            setPosition(-index*width);
        }else {
            addTransition();
            setPosition(-index*width);
        }

        startX=0;
        moveX=0;
        record=0;
        isMove=false;
        clearInterval(timer);
        timer=setInterval(function() {
            index++;
            addTransition();
            setPosition(-index*width);
        },1000);
    })
    function setPoint() {
        for(var i=0;i<points.length;i++) {
            points[i].className="";
        }
        points[index-1].className="current";
    }
    function addTransition() {
//    添加transition
        ulImg.style.transition="all 0.2s";
        ulImg.style.webkitTransition="all 0.2s";
    }
    function removeTransition() {
        //    删除transition
        ulImg.style.transition="none";
        ulImg.style.webkitTransition="none";
    }
    function setPosition(p) {
        ulImg.style.transform="translate("+p+"px)";
        ulImg.style.webkitTransform="translate("+p+"px)";
    }
}

function createNode(parent) {
    var li=parent.querySelectorAll("li");
//    console.log(li);
    parent.appendChild(li[0].cloneNode(true));
    parent.insertBefore(li[li.length-1].cloneNode(true),li[0]);
}*/
function banner2() {
    var imagesBox=$(".jd-banner");
    var ulImg=$(".jd-banner ul:eq(0)");
    var points=$(".jd-banner ul:eq(1)").children("li");
    var width=imagesBox.width();
    var index=1;
    createNode(ulImg);
    resetCss();
    var timer=setInterval(function() {
        index++;
        animate();
    },2000);
    function resetCss() {
        ulImg.css("transform","translateX("+(-index*width)+"px)");
        points.eq(index-1).addClass("current").siblings().removeClass("current");
    }
    function animate() {
        ulImg.animate({
            "transform":"translateX("+(-index*width)+"px)"
        },200,"ease",function() {
            if(index>8) {
                index=1;
                resetCss();
            }else if(index<=0) {
                index=8;
                resetCss();
            }
            points.eq(index-1).addClass("current").siblings().removeClass("current");
        });
    }
    imagesBox.on("touchstart",function() {
        clearInterval(timer);
    });
    imagesBox.on("touchend",function() {
        timer=setInterval(function() {
            index++;
            animate();
        },2000);
    });
    imagesBox.on("swipeLeft",function() {
        index++;
        ulImg.css({
            "transition":"all 0.2s"
        });
        resetCss();
    });
    imagesBox.on("swipeRight",function() {
        index--;
        ulImg.css({
            "transition":"all 0.2s"
        });
        resetCss();
    });
}
function createNode(parent) {
    var lastLi=parent.children("li").eq(0).clone();
    var firstLi=parent.find("li:last").clone();
    parent.prepend(firstLi);
    parent.append(lastLi);
}
function countdown() {
    var timeBox=document.querySelector(".time");
    var spans=timeBox.querySelectorAll("span");
    var future=new Date("2016/10/23 23:50:00");
    var timer=setInterval(function() {
        var now=new Date();
        var time=(future-now)/1000;
        if(parseInt(time)<0) {
            clearInterval(timer);
            return false;
        }
        var h=Math.floor(time/3600);
        var m=Math.floor((time%3600)/60);
        var s=Math.floor(time%60);
        spans[0].innerHTML=Math.floor(h/10);
        spans[1].innerHTML=Math.floor(h%10);
        spans[3].innerHTML=Math.floor(m/10);
        spans[4].innerHTML=Math.floor(m%10);
        spans[6].innerHTML=Math.floor(s/10);
        spans[7].innerHTML=Math.floor(s%10);
    },1000);
}