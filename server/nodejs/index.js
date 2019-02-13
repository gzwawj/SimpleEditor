const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const moment = require('moment')

const mongodbModel = require('./db/mongodb')
const mysqlModel = require('./db/mysql')
/**
 * 返回数据格式
 * @param {int} code 2001成功，2002错误
 * @param {string} msg 
 * @param {array} data 
 */
let returnData = function (code, msg, data) {
  return JSON.stringify({
    code: code,
    msg: msg,
    data: dataAction(data)
  })
}
/**
 * @function htmlscape 转义html脚本 < > & " '
 */
let htmlscape = function (html) {
  html = "" + html;
  return html.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");;
}
/**
 * @function scapehtml 还原html脚本 < > & " '
 */
let scapehtml = function (scape) {
  scape = "" + scape;
  return scape.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&apos;/g, "'");
}
let dataAction = function (data) {
  let arr = []
  data.forEach(e => {
    arr.push({
      "id": e.id,
      "title": scapehtml(e.title),
      "categories": scapehtml(e.categories),
      "keywords": scapehtml(e.keywords),
      "content": scapehtml(e.content),
    })
  });
  return arr;
}
/**
 * 获取所有数据
 * @param {object} model 
 * @param {function} func 
 */
let articleLst = function (model, func) {
  model.getAllData('article', e => {
    func(returnData(2001, '查询成功', e))
  })
}
/**
 * 添加数据
 * @param {object} model 
 * @param {object} data 
 * @param {function} func 
 */
let articleAdd = function (model, data, func) {
  model.add('article', data, e => {
    func(returnData(2001, '添加成功', e))
  })
}
/**
 * 删除数据
 * @param {object} model 
 * @param {array} where 删除条件
 * @param {function} func 
 */
let articleDel = function (model, where, func) {
  model.del('article', where, e => {
    func(returnData(2001, '删除成功', ''))
  })
}
/**
 * 修改数据
 */
let articleEdit = function (model, where, data, func) {
  model.edit('article', where, data, e => {
    func(returnData(2001, '修改成功', ''))
  })
}
/**
 * 查询某数据
 */
let articleQuery = function (model, where, func) {
  model.getOneData('article', where, e => {
    func(returnData(2001, '查询成功', e))
  })
}
//创建application/x-www-form-urlencoded 编码解析
let urlencodedParser = bodyParser.urlencoded({
  extended: false
})
//文章列表
app.all('/', urlencodedParser, (req, res) => {
  res.header("Access-Control-Allow-Origin", "*"); //设置跨域
  res.writeHead(200, {
    'Content-Type': 'text/html; charset=utf-8'
  });
  //设置时间
  moment.locale('zh-cn')
  //获取当前时间
  let detetime = moment().format('YYYY-MM-DD HH:mm')
  //请求数据
  let requestData = req.query
  let model = {};
  let data = {
    "title": htmlscape(req.body.title),
    "categories": htmlscape(req.body.categories),
    "keywords": htmlscape(req.body.keywords),
    "content": htmlscape(req.body.content),
  }
  let where = []
  where['id'] = req.query.id
  // console.log(where)
  //实例化数据库
  if (requestData.db == 'mongodb') {
    model = new mongodbModel()
  }
  if (requestData.db == 'mysql') {
    model = new mysqlModel()
  }
  //操作方法
  if (requestData.fun == 'lst') {
    articleLst(model, e => {
      res.end(e)
    })
  }
  if (requestData.fun == 'add') {
    articleAdd(model, data, e => {
      res.end(e)
    })
  }
  if (requestData.fun == 'del') {
    articleDel(model, where, e => {
      res.end(e)
    })
  }
  if (requestData.fun == 'edit') {
    articleEdit(model, where, data, e => {
      res.end(e)
    })
  }
  if (requestData.fun == 'query') {
    articleQuery(model, where, e => {
      res.end(e)
    })
  }
})
//启动服务
var server = app.listen(8899, function () {
  console.log(
    "应用实例，访问地址为 http://%s:%s",
    server.address().address,
    server.address().port
  )
})