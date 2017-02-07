/**
 * Created by Administrator on 2017/1/31.
 */
function header(){
var file=null;
jQuery(function($){
    $('#preview-pane .preview-container').width(100);
    $('#preview-pane .preview-container').height(100);
    // Create variables (in this scope) to hold the API and image size
    var jcrop_api,
        boundx,
        boundy,

    // Grab some information about the preview pane

        $preview = $('#preview-pane'),
        $pcnt = $('#preview-pane .preview-container'),
        $pimg = $('#preview-pane .preview-container img'),
        xsize = $pcnt.width(),
        ysize = $pcnt.height();

    $('#target').Jcrop({
        onChange: updatePreview,
        onSelect: updatePreview,
        aspectRatio: xsize / ysize
    },function(){
        // Use the API to get the real image size
        var bounds = this.getBounds();
        boundx = bounds[0];
        boundy = bounds[1];
        // Store the API in the jcrop_api variable
        jcrop_api = this;

        // Move the preview into the jcrop container for css positioning
        $preview.appendTo(jcrop_api.ui.holder);
    });

    function updatePreview(c)
    {
        if (parseInt(c.w) > 0)
        {
            var rx = xsize / c.w;
            var ry = ysize / c.h;

            $pimg.css({
                width: Math.round(rx * boundx) + 'px',
                height: Math.round(ry * boundy) + 'px',
                marginLeft: '-' + Math.round(rx * c.x) + 'px',
                marginTop: '-' + Math.round(ry * c.y) + 'px'
            });
        }
    };
    $(".jcrop-keymgr").css({
        "left":-5000
    });
});
    var href = "/";
$(".navItem").click(function() {
    href=$(this).attr("data-href");
});
$(window).scroll(function() {
    if($(window).scrollTop()>=$(".widget").eq(0).offset().top) {
        $(".userInfo").hide(200);
    }else {
        $(".userInfo").show(200);
    }
});
$(".userInfo").click(function() {
//    $(window).scrollTop($(".widget").eq(0).offset().top);
    $("html,body").animate({scrollTop: $(".widget").eq(0).offset().top},500);
});
$("#gotoURL").click(function() {
    location.href=href;
});
template.config("openTag","{{");
template.config("closeTag","}}");
template.helper('dateFormat', function (date, format) {

    date = new Date(date);

    var map = {
        "M": date.getMonth() + 1, //月份
        "d": date.getDate(), //日
        "h": date.getHours(), //小时
        "m": date.getMinutes(), //分
        "s": date.getSeconds(), //秒
        "q": Math.floor((date.getMonth() + 3) / 3), //季度
        "S": date.getMilliseconds() //毫秒
    };
    format = format.replace(/([yMdhmsqS])+/g, function(all, t){
        var v = map[t];
        if(v !== undefined){
            if(all.length > 1){
                v = '0' + v;
                v = v.substr(v.length-2);
            }
            return v;
        }
        else if(t === 'y'){
            return (date.getFullYear() + '').substr(4 - all.length);
        }
        return all;
    });
    return format;
});
$("#exampleInputFile").change(function() {
    var tImg = $("#target");
    var oImg = $(".jcrop-preview");
    var img = $(".jcrop-holder img");
    var reader=new FileReader();
    reader.readAsDataURL(this.files[0]);
    reader.onload = function() {
        $(".jcrop-holder").css("display","block");
        tImg.attr("src",this.result);
        oImg.attr("src",this.result);
        img.attr("src",this.result);
    }
    file=this.files[0];
});
$("#ok").click(function() {
    var width=parseInt($(".jcrop-holder > div").eq(0).width());
    var height=parseInt($(".jcrop-holder > div").eq(0).height());
    var left=parseInt($(".jcrop-holder > div").eq(0).css("left"));
    var top=parseInt($(".jcrop-holder > div").eq(0).css("top"));
    var fd = new FormData();
    fd.append("width",width);
    fd.append("height",height);
    fd.append("left",left);
    fd.append("top",top);
    fd.append("file",file);
    var xhr=new XMLHttpRequest();
    xhr.open("post","/doCrop",true);
//            xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    xhr.send(fd);
    xhr.onreadystatechange = function() {
        if(this.status>=200&&this.status<400) {
            if(this.readyState==4) {
                if(this.responseText!="-3") {
                    if($("#main-menu .menu").eq(1).attr("class")=="nav-current"){
                        $(".branding img").attr("src","/images/"+this.responseText);
                    }
                    $("#close").click();
                }
            }
        }
    }
});
$("#login").click(function() {
    var username=$("#exampleInputUsername1").val();
    var password=$("#exampleInputPassword1").val();
    if($.trim(username)!=""&&$.trim(password)!="") {
        $.post("/doLogin",{
            "username" : username,
            "password" : password
        },function(result) {
            if(result=="1") {
                alert("登陆成功");
                location.href="/";
            }else if(result=="-2") {
                alert("用户不存在");
            }else if(result=="-1"){
                alert("密码错误");
            }else {
                alert("服务器错误,请联系管理员");
            }
        });
    }else {
        alert("用户名和密码不能为空");
    }
});
$("#registered").click(function() {
    var username=$("#exampleInputUsername2").val();
    var password=$("#exampleInputPassword2").val();
    var nickname=$("#exampleInputNickname1").val() || "undefined";
    var description=$("#exampleInputDescription1").val() || "大懒虫";
    var flag=$("#agree").prop("checked");
    if($.trim(username)!=""&&$.trim(password)!="") {
        if(flag) {
            $.post("/doRegistered",{
                "username" : username,
                "password" : password,
                "nickname" : nickname,
                "description" : description
            },function(result) {
                if(result=="1") {
                    alert("注册成功");
                    location.href="/";
                }else if(result=="-2") {
                    alert("用户已经存在,请登录");
                }else {
                    alert("服务器错误,请联系管理员");
                }
            });
        }else {
            alert("请同意该条款");
        }
    }else {
        alert("用户名和密码不能为空");
    }
});
}