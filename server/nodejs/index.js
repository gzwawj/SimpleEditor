const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const moment = require('moment')
const mongodb = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectID

let url = 'mongodb://localhost:27017/'
//创建application/x-www-form-urlencoded 编码解析
let urlencodedParser = bodyParser.urlencoded({ extended: false })
//文章列表
app.get('/lst', function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");//设置跨域
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  //数据库操作
  mongodb.connect(url, { useNewUrlParser: true }, (err, db) => {
    if (err) {
      throw err;
    }
    let dbo = db.db('test');
    dbo.collection('article').find({}).toArray((err, result) => {
      if (err) {
        throw err;
      }
      db.close();//关闭数据库
      res.end(JSON.stringify({ code: 200, massage: 'ok', data: result }))
    })
  })
})

//添加文章
app.post('/add', urlencodedParser, (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");//设置跨域
  moment.locale('zh-cn')
  //获取当前时间
  let detetime = moment().format('YYYY-MM-DD HH:mm')
  //数据库操作
  mongodb.connect(url, { useNewUrlParser: true }, (err, db) => {
    if (err) {
      throw err;
    }
    let dbo = db.db('test');
    let data = {
      id: req.body.id,
      title: req.body.title,
      article: req.body.article,
      createtime: detetime
    }
    dbo.collection('article').find({ title: req.body.title }).toArray((err, findRes) => {
      if (err) {
        throw err;
      }
      if (findRes.length > 0) {
        //有数据就返回数据显示，更新操作
        let where = { 'id': req.body.id }
        let updateData = { $set: { 'title': req.body.title, 'article': req.body.article } }
        dbo.collection('article').updateOne(where, updateData, (err, upRes) => {
          if (err) {
            throw err;
          }
          db.close();//关闭数据库
          findRes[0] = data
          res.end(JSON.stringify({ code: 200, massage: '更新成功', data: findRes }))
        })
      } else {
        //没有数据执行添加数据操作
        dbo.collection('article').insertOne(data, (err, result) => {
          if (err) {
            throw err;
          }
          db.close();//关闭数据库
          res.end(JSON.stringify({ "code": 200, "massage": '添加成功', "data": result.ops }));//result.ops是添加后的数据
        })

      }
    })
  })
})

var server = app.listen(8899, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
})