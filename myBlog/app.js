var express=require("express");
var app=express();
var http = require("http");
var https = require("https");
var fs = require("fs");
var router= require("./controller/router");
var session = require("express-session");
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 604800000 }
}));
app.set("view engine","ejs");
app.use(express.static("./public"));
app.get("/",router.showIndex);
app.get("/:username",router.homePage);
app.get("/u/cloudDisk",router.cloudDisk)
app.post("/doRegistered",router.registered);
app.post("/doLogin",router.login);
app.post("/doCrop",router.crop);
app.post("/doFatie",router.fatie);
app.post("/doComment",router.comment);
app.post("/doLamessage",router.lAmessage);
app.post("/doUpload",router.upload);
app.get("/u/cloudDisk/download",router.download);
app.get("/u/cloudDisk/share",router.share);
app.get("/u/cloudDisk/unshare",router.unshare);
app.get("/u/shareResources",router.shareResources);
app.get("/u/userInfo",router.userInfo);
app.get("/u/userList",router.userList);
app.get("/u/addFriends",router.addFriends);
app.get("/u/allTiezi",router.allTiezi);
app.get("/u/lAmessage",router.showlAmessage);
app.get("/u/allFiles",router.allFiles);
app.get("/u/fileImg/:image",router.fileImg);
app.get("/u/deleteFile",router.deleteFile);
app.get("/u/exit",router.exit);
http.createServer(app).listen(2000,"192.168.0.110");
https.createServer({"key":fs.readFileSync('./newServer.pem'),"cert":fs.readFileSync('./server.crt')},app).listen(3000,"192.168.0.110");
