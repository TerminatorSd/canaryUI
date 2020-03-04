var express = require("express");
//网络请求模块
var request = require("request");
//引入nodejs文件系统模块
const fs = require('fs');
//引入body-parser
//包含在请求正文中提交的键/值对数据。 
//默认情况下，它是未定义的，并在使用body-parser中间件时填充。
var bodyParser = require('body-parser');
var app = express();
//解析 application/x-www-form-urlencoded，limit:'20mb'用于设置请求的大小
//解决nodejs Error: request entity too large问题
app.use(bodyParser.urlencoded({ limit:'20mb',extended: true })); 
//设置跨域访问
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
//上传图片
app.post('/upload',function(req,res){
    var imgData = req.body.url;
    var base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");
    var dataBuffer = new Buffer(base64Data, 'base64');
    fs.writeFile("image.png", dataBuffer, function(err) {
        if(err){
            res.send(err);
        }else{
            res.send("保存成功！");
        }
    });
})

var server = app.listen(4444, function() {
    console.log('监听端口 4444');
});
