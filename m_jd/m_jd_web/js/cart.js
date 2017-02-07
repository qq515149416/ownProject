/**
 * Created by Administrator on 2016/10/23.
 */
window.onload = function() {
    deleteBox();
}
function deleteBox() {
    var deletebox=document.querySelectorAll(".garbage");
    var deleteTipBox=document.querySelector(".deleteTipBox");
    var warnBox=deleteTipBox.querySelector(".warnBox");
    var cancel=document.querySelector(".cancel");
    var currObj=null;
    for(var i=0;i<deletebox.length;i++) {
        deletebox[i].onclick = function() {
            deleteTipBox.style.display="block";
            warnBox.classList.add("bounceInDown");
            currObj=this;
            currObj.children[0].style.transition="all 1s";
            currObj.children[0].style.transformOrigin="left bottom";
            currObj.children[0].style.transform="rotate(-30deg) translateY(2px)";
        }
    }
    cancel.onclick = function() {
        deleteTipBox.style.display="none";
        currObj.children[0].style.transformOrigin="left bottom";
        currObj.children[0].style.transform="none";
    }
}