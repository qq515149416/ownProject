var oad = require("../models/oad");
var md5 = require("../models/md5");
var formidable = require("formidable");
var ObjectID= require("mongodb").ObjectID;
var gm = require("gm");
var fs = require("fs");
var path = require("path");
var latestArticles=[];
function classification(tagArr,callbark) {
    var newArr=[];
    var newTagArr=[];
    for(var i=0;i<tagArr.length;i++) {
        newTagArr.push(tagArr[i]);
    }
    for(var i=0;i<newTagArr.length;i++) {
        if(newTagArr[i]=="") {
            continue ;
        }
        newArr.push(newTagArr[i].keyword);
        newArr[newTagArr[i].keyword]=1;
        for(var j=i+1;j<newTagArr.length;j++) {
            if(newTagArr[i].keyword==newTagArr[j].keyword) {
                newArr[newTagArr[i].keyword]++;
                newTagArr[j]="";
            }
        }
    }
    newArr.sort(function(a,b) {
        return newArr[b]-newArr[a];
    });
    callbark(newArr);
}
exports.showIndex = function(req,res,next) {
    oad.find("posts",{},{"sort":{"date":-1}},function(err,result) {
        classification(result,function(ca) {
            res.render("index",{
                login: req.session.login==1?true:false,
                headIcon: req.session.login==1?req.session.headIcon:"error.jpg",
                username: req.session.login==1?req.session.username:"游客",
                nickname : req.session.login==1?req.session.nickname:"游客",
                description : req.session.login==1?req.session.description:"请注册",
                content: result,
                ative: "/",
                ca : ca,
                availableSpace: req.session.availableSpace
            });
        });
        latestArticles=result;
    });
}
exports.homePage = function(req,res,next) {
    if(req.session.login!=1) {
        res.redirect("/");
        return;
    }
    var username=req.params["username"];
    var query={"username": username};
    if(username=="favicon.ico"){
        return ;
    }
    var path="";
    if(username==req.session.username) {
        path="myHome";
    }
    if(req.query.title) {
        query={"username": username,"title": req.query.title};
    }
    oad.find("posts",query,{"sort":{"date":-1}},function(err,result) {
        if(err) {
            res.send("404");
        }
        if(path=="myHome") {
            classification(result,function(ca) {
                res.render("homePage", {
                    login: req.session.login == 1 ? true : false,
                    headIcon: req.session.login == 1 ? req.session.headIcon : "error.jpg",
                    username: req.session.login == 1 ? req.session.username : "游客",
                    nickname: req.session.login == 1 ? req.session.nickname : "游客",
                    description: req.session.login == 1 ? req.session.description : "请注册",
                    content: result,
                    ative: path,
                    ca: ca,
                    availableSpace: req.session.availableSpace
                });
            });
        }else {
            oad.find("users",{"username": username},function(err,uresult) {
                classification(result,function(ca) {
                    res.render("homePage", {
                        login: req.session.login == 1 ? true : false,
                        headIcon: uresult[0].headIcon,
                        username: uresult[0].username,
                        nickname: uresult[0].nickname,
                        description: uresult[0].description,
                        content: result,
                        ative: path,
                        ca: ca,
                        availableSpace: uresult[0].availableSpace
                    });
                });
            });
        }
    });
}
exports.registered = function(req,res,next) {
    var form = new formidable.IncomingForm();
    form.parse(req,function(err,fields,files) {
        oad.find("users",{"username":fields.username},function(err,result) {
            if(err) {
                console.log(err);
                return ;
            }
            if(result.length==0) {
                fields.password=md5.md5password(md5.md5password(fields.password)+"Leeziliang");
                fields.headIcon="timg.jpg";
                fields.friends =[];
                fields.availableSpace = 1000*1000*1000;
                oad.insertOne("users",fields,function(err,result) {
                    if(err) {
                        res.send("-3");
                    }
                    req.session.login=1;
                    req.session.username=fields.username;
                    req.session.nickname=fields.nickname;
                    req.session.description=fields.description;
                    req.session.headIcon=fields.headIcon;
                    req.session.friends=fields.friends;
                    req.session.availableSpace=fields.availableSpace;
                    fs.mkdir("./update/"+fields.username);
                    res.send("1");
//                    console.log(result);
                });
            }else {
                res.send("-2");
            }
        });

    })
}
exports.login = function(req,res,next) {
    var form = new formidable.IncomingForm();
    form.parse(req,function(err,fields,files) {
        oad.find("users",{"username":fields.username},function(err,result) {
            if(err) {
                console.log(err);
                res.send("-3");
                return ;
            }
            if(result.length==0) {
                res.send("-2");
                return ;
            }
            fields.password=md5.md5password(md5.md5password(fields.password)+"Leeziliang");
            if(result[0].password==fields.password) {
                req.session.login=1;
                req.session.username=result[0].username;
                req.session.nickname=result[0].nickname;
                req.session.description=result[0].description;
                req.session.headIcon=result[0].headIcon;
                req.session.friends=result[0].friends;
                req.session.availableSpace=result[0].availableSpace;
                res.send("1");
            }else {
                res.send("-1");
            }
        })
    });
}
exports.crop = function(req,res,next) {
    var form = new formidable.IncomingForm();
    form.uploadDir="./temp";
    form.parse(req,function(err,fields,files) {
        gm(files["file"].path).resize(602,400,"!").crop(fields.width,fields.height,fields.left,fields.top).resize(100,100,"!").write("./public/images/"+files["file"].name,function(err){
             if(err) {
                 res.send("-3");
             }
            oad.update("users",{"username":req.session.username},{$set:{"headIcon":files["file"].name}},function(err,result) {
            if(err) {
                res.send("-3");
            }
                fs.unlink(files["file"].path,function(err) {
                    if(err) {
                        console.log("删除失败");
                        return ;
                    }
                });
                req.session.headIcon=files["file"].name;
            res.send(files["file"].name);
        });
        });

    });
}
exports.fatie = function(req,res,next) {
    if(req.session.login!=1) {
        res.send("-1");
        return ;
    }
    var form = new formidable.IncomingForm();
    form.parse(req,function(err,fields,files) {
        oad.insertOne("posts",{"username":req.session.username,"nickname": req.session.nickname,"keyword":fields.keyword,"title":fields.title,"content":fields.content,"date": new Date(),"comment":[]},function(err,result) {
            if(err) {
                res.send("-3");
                return ;
            }
            res.send("1");

        })
    });
}
exports.comment = function(req,res,next) {
    var form = new formidable.IncomingForm();
    form.parse(req,function(err,fields,files) {
        var obj={"username": req.session.username,"content": fields.content,"id": fields.id,"date": new Date()};
        oad.find("posts",{"_id": new ObjectID(fields.id)},function(err,result) {
            var newArr=result[0].comment;
            newArr.unshift(obj);
            oad.update("posts",{"_id": new ObjectID(fields.id)},{$set: {"comment": newArr}},function(err,result) {
                if(err) {
                    res.json({"code": 3,"object": null});
                }
                res.json({"code": 1,"object": obj});
            });
        });
    });
}
exports.lAmessage = function(req,res,next) {
    var form = new formidable.IncomingForm();
    form.parse(req,function(err,fields,files) {
        fields.sender=req.session.username;
        oad.insertOne("lAmessage",fields,function(err,result) {
            if(err) {
                res.send("-3");
                return ;
            }
            res.send("1");
        });
    });
}
exports.showlAmessage = function(req,res,next) {
    if(req.session.login!=1) {
        res.redirect("/");
        return ;
    }
    oad.find("lAmessage",{"recipient": req.session.username},function(err,result) {
        res.render("lAmessage",{
            login: true,
            headIcon: req.session.headIcon,
            username: req.session.username,
            nickname : req.session.nickname,
            description : req.session.description,
            ative: "liuyan",
            content: latestArticles,
            ca : [],
            lAmessage: result,
            availableSpace: req.session.availableSpace
        });
    });
}
exports.cloudDisk = function(req,res,next) {
    if(req.session.login!=1) {
          res.redirect("/");
          return ;
    }
    var filesArr=[];
    fs.readdir("./update/"+req.session.username,function(err,files) {
        function iteration(i){
            console.log(files[i]);
            var extname = path.extname(files[i]);
            var obj= {filename:files[i],share:false};
            if(i>=files.length) {
                classification(latestArticles,function(ca) {
                    res.render("cloudDisk",{
                        login: true,
                        headIcon: req.session.headIcon,
                        username: req.session.username,
                        nickname : req.session.nickname,
                        description : req.session.description,
                        ative: "myYunpan",
                        content: latestArticles,
                        files: filesArr,
                        ca : ca,
                        availableSpace: req.session.availableSpace
                    });
                });
                return ;
            }
            oad.find("share",{"name":req.session.username},function(err,result) {
                if(err) {
                    console.log("error");
                    return ;
                }
                if(result.length!=0) {
                    for(var j=0;j<result[0].shareFile.length;j++) {
                        if(files[i]==result[0].shareFile[j]) {
                            obj.share=true;
                        }
                    }
                }
                if(extname==".jpg"||extname==".png"||extname==".gif") {
                    gm("./update/"+req.session.username+"/"+files[i]).resize(96,96,"!").write("./public/images/u"+files[i],function(err) {
                        if(err) {
                            console.log("裁剪失败");
                            return ;
                        }
                    });
                }
                fs.stat("./update/"+req.session.username+"/"+files[i],function(err,stats) {
                    if(stats.isFile()) {
                        filesArr.push(obj);
                    };
                    iteration(i+1);
                });
            });
        }
        iteration(0);
    });
}
exports.upload = function(req,res,next) {
    var form = new formidable.IncomingForm();
    form.uploadDir="./temp";
    form.parse(req,function(err,fields,files) {
        if(req.session.availableSpace-files["file"].size<=0) {
            res.send("空间不足");
            setTimeout(function() {
                res.redirect("/u/cloudDisk");
            },500);
            return ;
        }
        fs.rename(files["file"].path,"./update/"+req.session.username+"/"+files["file"].name,function() {
            oad.update("users",{"username":req.session.username},{$set:{"availableSpace": (req.session.availableSpace-files["file"].size)}},function(err,result) {
                req.session.availableSpace = (req.session.availableSpace-files["file"].size);
                setTimeout(function() {
                    res.redirect("/u/cloudDisk");
                },500);
            });
        });
    });
}
exports.download = function(req,res,next) {
//    if(req.session.login!=1) {
//        res.redirect("/");
//        return ;
//    }
    var filename = req.query.filename || "";
    var username = req.query.username || req.session.username;
    if(filename == "") {
        console.log("错误文件");
        res.send("请选择要下载的文件");
        setTimeout(function() {
            res.redirect("/u/cloudDisk");
        },2000);
        return ;
    }
    res.download("./update/"+username+"/"+filename,filename,function(err) {
        if(err) {
            res.send("未知错误请联系管理员");
            setTimeout(function() {
                res.redirect("/u/cloudDisk");
            },2000);
            return ;
        }
    });
}
exports.share = function(req,res,next) {
    if(req.session.login!=1) {
        res.send("-1");
        return ;
    }
    var shareFile=req.query.shareFile;
    oad.find("share",{"name":req.session.username},function(err,fresult) {
        if(err) {
            res.send("-3");
        }
        var shareArr = fresult.length==0?[]:fresult[0].shareFile;
        if(fresult.length==0) {
            shareArr.push(shareFile);
            oad.insertOne("share",{"name":req.session.username,"shareFile":shareArr},function(err,iresult) {
                if(err) {
                    res.send("-3");
                }
                res.send("1");
            });
        }else{
            shareArr.push(shareFile);
            oad.update("share",{"name":req.session.username},{$set:{"shareFile":shareArr}},function(err,uresult) {
                if(err) {
                    res.send("-3");
                }
                res.send("1");
            })
        }

    })
}
exports.unshare = function(req,res,next) {
    var unshareFile=req.query.unshare;
    var newArr=[];
    oad.find("share",{"name":req.session.username},function(err,result) {
        if(err) {
            res.send("-3");
            return ;
        }
        for(var i=0;i<result[0].shareFile.length;i++) {
            if(result[0].shareFile[i]==unshareFile) {
                continue;
            }
            newArr.push(result[0].shareFile[i]);
        }
        oad.update("share",{"name":req.session.username},{$set:{"shareFile":newArr}},function(err,result) {
            if(err) {
                res.send("-3");
            }
            res.send("1");
        })
    });
}
exports.shareResources = function(req,res,next) {
    oad.find("posts",{},{"sort":{"date":-1}},function(err,result) {
        oad.find("share",{},function(err,shareAll) {
            if(err) {
                res.send("404");
                return ;
            }
            classification(result,function(ca) {
                res.render("shareResources", {
                    login: req.session.login == 1 ? true : false,
                    headIcon: req.session.login == 1 ? req.session.headIcon : "error.jpg",
                    username: req.session.login==1?req.session.username:"游客",
                    content: result,
                    ative: "yunpanFx",
                    shareAll: shareAll,
                    ca : ca,
                    availableSpace: req.session.availableSpace
                });
            });
        });

    });
}
exports.userInfo = function(req,res,next) {
    var username=req.query.username;
    oad.find("users",{"username":username},function(err,result) {
        if(err) {
            res.send("-3");
        }
        res.json(result[0]);
    });
}
exports.userList = function(req,res,next) {
    oad.find("posts",{},{"sort":{"date":-1}},function(err,result) {
        oad.find("users",{},function(err,userlist) {
            if(err) {
                res.send("404");
                return ;
            }
            classification(result,function(ca) {
                res.render("userList", {
                    login: req.session.login == 1 ? true : false,
                    headIcon: req.session.login == 1 ? req.session.headIcon : "error.jpg",
                    username: req.session.login == 1 ? req.session.username : "游客",
                    content: result,
                    ative: "userList",
                    userlist: userlist,
                    ca: ca,
                    availableSpace: req.session.availableSpace
                });
            });
        })
    });
}
exports.addFriends = function(req,res,next) {
    if(req.session.login!=1) {
        res.send("-1");
        return ;
    }
    var friends=req.query.username || "";
    oad.find("users",{"username":req.session.username},function(err,userlist) {
        if(userlist.length==0) {
            res.send("-2");
            return ;
        }
        userlist[0].friends.push(friends);
        oad.update("users",{"username":req.session.username},{$set:{"friends":userlist[0].friends}},function(err,result) {
            if(err) {
                res.send("-3");
                return ;
            }
            res.send("1");
        });
    });
}
exports.allTiezi = function(req,res,next) {
    var tag = req.query.tag || "默认分类";
    var query={"keyword":tag};
    if(req.query.username) {
        query={"keyword":tag,"username": req.query.username};
    }
    oad.find("posts",query,function(err,result) {
        if(err) {
            res.send("-3");
        }
        res.send(result);
    });
}
exports.allFiles = function(req,res,next) {
    var imgArr=[];
        fs.readdir("./update/"+req.session.username+"/",function(err,result) {
            if(err) {
                res.send("-3");
                return ;
            }
            for(var i=0;i<result.length;i++) {
                var extname = path.extname(result[i]);
                if(extname==".jpg"||extname==".png"||extname==".gif") {
                    imgArr.push(result[i]);
                }
            }
            res.send(imgArr);
        });
}
exports.fileImg = function(req,res,next) {
       var imgName =req.params["image"];
    var username = req.query.username || req.session.username;
    fs.readFile("./update/"+username+"/"+imgName,function(err,file) {
        if(err) {
            res.send("404");
        }
        res.end(file);
    })
}
exports.deleteFile = function(req,res,next) {
    var filename=req.query.filename;
    var newArr=[];
    oad.find("share",{"name":req.session.username},function(err,result) {
        if(err) {
            res.send("-3");
            return ;
        }
        for(var i=0;i<result[0].shareFile.length;i++) {
            if(result[0].shareFile[i]==filename) {
                continue;
            }
            newArr.push(result[0].shareFile[i]);
        }
        oad.update("share",{"name":req.session.username},{$set:{"shareFile":newArr}},function(err,result) {
            if(err) {
                res.send("-3");
            }
            fs.stat("./update/"+req.session.username+"/"+filename,function(err,stats) {
                if(err) {
                    res.send("文件读取失败");
                    return;
                }
                oad.find("users",{"username":req.session.username},function(err,result) {
                    if(err) {
                        res.send("-3");
                        return ;
                    }
                    req.session.availableSpace = result[0].availableSpace+stats.size;
                        oad.update("users",{"username":req.session.username},{$set:{"availableSpace": result[0].availableSpace+stats.size}},function(err,result) {
                        if(err) {
                            res.send("-3");
                            return ;
                        }
                        fs.unlink("./update/"+req.session.username+"/"+filename,function(err) {
                            if(err) {
                                res.send("-3");
                            }
                            res.send("1");
                        });
                    });
                });
            });

        })
    });
}
exports.exit = function(req,res,next) {
    req.session.login=0;
    req.session.username="";
    req.session.nickname="";
    req.session.description="";
    req.session.headIcon="error.jpg";
    req.session.friends=[];
    req.session.availableSpace=0;
//    res.send("退出成功")
    res.redirect("/");
}