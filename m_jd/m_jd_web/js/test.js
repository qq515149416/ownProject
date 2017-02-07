/**
 * Created by Administrator on 2016/10/19.
 */
function jkg(str) {
var testString=str;
var arr=[];
for(var i=0;i<testString.length;i++) {
    arr.push(testString.charAt(i));
}
return arr.join(" ");
}