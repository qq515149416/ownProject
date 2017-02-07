/**
 * Created by Administrator on 2017/1/25.
 */
var crypto=require("crypto");
exports.md5password = function(password) {
    var md5=crypto.createHash("md5").update(password).digest("hex");
    return md5;
}