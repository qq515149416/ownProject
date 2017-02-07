/**
 * Created by Administrator on 2016/10/29.
 */
$(function() {
    banner();
    touchMove();
    $(".tiptext > span").tooltip();
});
function banner() {
    /**
     * 1.获取数据
     * 2.根据不同设备（判断屏幕宽度）解析数据并做相应的渲染
     * 3.当浏览器大小发生改变需要重新判断渲染
     * 4.在移动端需要做手势滑动功能
     * */
    var myData;
     function getData(callbrak) {
         if(myData) {
             callbrak && callbrak(myData);
             return false;
         }
        $.ajax({
            url:"js/index.json",
            type:"get",
            data:{},
            dataType:"json",
            success:function(data) {
                myData=data;
                callbrak && callbrak(myData);
            }
        });
    }
    function render() {
        var width=$(window).width();
        var isMobile=false;
        if(width<770) {
            isMobile=true;
        }
        getData(function(data) {
           var pointTemplate= _.template($("#point_template").html());
           var imageTemplate= _.template($("#image_template").html());
            $(".carousel-indicators").html(pointTemplate({data:data}));
            $(".carousel-inner").html(imageTemplate({data:data,isMobile:isMobile}));
        });
    }
    $(window).on("resize",function() {
        render();
    }).trigger("resize");
    gestureMove();
    function gestureMove(){
        var startX=0;
        var moveX=0;
        var itanice=0;
        var isMove=false;
        $(".carousel-inner").on("touchstart",function(e) {
            startX= e.originalEvent.touches[0].clientX;
        });
        $(".carousel-inner").on("touchmove",function(e) {
            moveX= e.originalEvent.touches[0].clientX;
            itanice=moveX-startX;
            isMove=true;
        });
        $(".carousel-inner").on("touchend",function(e) {
            if(isMove) {
                if(itanice>0) {
                    /*上一张*/
                    $("#carousel-example-generic").carousel("prev");
                }else{
                    /*下一张*/
                    $("#carousel-example-generic").carousel("next");
                }
            }
            startX=0;
            moveX=0;
            itanice=0;
            isMove=false;
        });
    }
 }
/*移动端滑动tab效果*/
function touchMove() {
    var navTabs=$(".wjs-nav-tabs");
    var navTabsBox=navTabs.parent();
    var Tabs=navTabs.children("li");
    var width=0;
    Tabs.each(function(index,item) {
        width+=$(item).innerWidth();
    });
    navTabs.width(width);
    var startX=0;
    var moveX=0;
    var buffer=0;
    var isMove=false;
    var current=0;
    var max=0;
    var min=navTabs.width()-navTabsBox.width();
    var Cache=40;
    navTabsBox[0].addEventListener("touchstart",function(e) {
        startX= e.touches[0].clientX;
    });
    navTabsBox[0].addEventListener("touchmove",function(e) {
        moveX= e.touches[0].clientX;
        buffer=moveX-startX;
        removeTransition();
        if((current+buffer)>max+Cache) {
            setPosition(max+Cache);
        }else if((current+buffer)<-(min+Cache)) {
            setPosition(-(min+Cache));
        }else {
            setPosition(current+buffer);
        }
        isMove=true;
    });
    navTabsBox[0].addEventListener("touchend",function(e) {
        if(isMove) {
            current+=buffer;
            if(current>max) {
                addTransition();
                setPosition(max);
                current=max;
            }else if(current<-min) {
                addTransition();
                setPosition(-min);
                current=-min;
            }
        }
        startX=0;
        moveX=0;
        buffer=0;
        isMove=false;
    });
    function addTransition() {
        navTabs.css({
            "transition":"all .5s",
            "webkitTransition":"all .5s"
        });
    }
    function removeTransition() {
        navTabs.css({
            "transition":"none",
            "webkitTransition":"none"
        });
    }
    function setPosition(p) {
        navTabs.css({
            "transform":"translateX("+p+"px)"
        });
    }
}