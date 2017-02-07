/**
 * Created by Administrator on 2017/1/14.
 */
var MongoClient = require('mongodb').MongoClient;

function MongoDBClient(callbrack) {
    var url = 'mongodb://localhost:27017/diyblog';
    MongoClient.connect(url, function(err, db) {
        if(err) {
            console.log("数据库连接不成功");
            return ;
        }
        callbrack(err,db);
    });
}
exports.insertOne= function(collectionName,json,callbrack) {
    MongoDBClient(function(err,db) {
        db.collection(collectionName).insertOne(json,function(err,result) {
            if(err) {
                console.log("插入失败");
                return ;
            }
            db.close();
            callbrack(err,result);
        });
    });
}
exports.find = function() {
    var _arguments=arguments;
    if(arguments.length<3) {
        console.log("参数不能小于三个")
        return ;
    }
    MongoDBClient(function(err,db) {
        if(_arguments.length==4) {
            var collectionName=_arguments[0];
            var json=_arguments[1];
            var callbrack=_arguments[3];
            var showcount=_arguments[2].showcount || 10;
            var page=_arguments[2].page?_arguments[2].page*_arguments[2].showcount:0;
            var sort=_arguments[2].sort||{};
            db.collection(collectionName).find(json).limit(showcount).skip(page).sort(sort).toArray(function(err,doc) {
                if(err) {
                    console.log("查询失败");
                    return ;
                }
                callbrack(err,doc);
                db.close();
            });
        }else {
            var collectionName=_arguments[0];
            var json=_arguments[1];
            var callbrack=_arguments[2];
            db.collection(collectionName).find(json).toArray(function(err,doc) {
                if(err) {
                    console.log("查询失败");
                    return ;
                }
                callbrack(err,doc);
                db.close();
            });
        }
    });
}
exports.delete=function(collectionName,json,callbrack) {
    MongoDBClient(function(err,db) {
        db.collection(collectionName).removeMany(json,function(err,result) {
            if(err) {
                console.log("删除失败");
                return ;
            }
            callbrack(err,result);
            db.close();
        });
    });
}
exports.update = function(collectionName,find,json,callbrack) {
    MongoDBClient(function(err,db) {
        db.collection(collectionName).updateMany(find,json,function(err,result) {
            if(err) {
                console.log("rewrite error",err);
                return ;
            }
            callbrack(err,result);
        });
    });
}