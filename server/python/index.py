from flask import Flask, jsonify
from flask import request
# import sys
# sys.path.append('./db')
from db.MysqlModel import *
from db.MongodbModel import *

import html

app = Flask(__name__)


# 返回数据格式
def returnData(code, msg, data=[]):
    return jsonify({"code": code, "msg": msg, "data": dataAction(data)})


# 转义html代码
def htmlscape(htmlstr):
    return html.escape(htmlstr)


# 反转义html代码
def scapehtml(scapestr):
    return html.unescape(scapestr)


def dataAction(data):
    if (type(data) == int):
        return data
    else:
        arr = []
        for v in data:
            arr.append({
                "id": v['id'],
                "title": scapehtml(v['title']),
                "categories": scapehtml(v['categories']),
                "keywords": scapehtml(v['keywords']),
                "content": scapehtml(v['content'])
            })
        return arr


# 获取列表
def articleLst(model):
    res = model.getAllData('article')
    if res:
        return returnData(2001, '查询成功', res)
    else:
        return returnData(2002, '无数据')


# 添加数据
def articleAdd(model, data):
    res = model.add('article', data)
    if res:
        return returnData(2001, '添加成功', res)
    else:
        return returnData(2002, '添加失败')


# 删除
def articleDel(model, where):
    res = model.delete('article', where)
    if res:
        return returnData(2001, '删除成功', res)
    else:
        return returnData(2002, '删除失败')


# 修改
def articleEdit(model, where, data):
    res = model.edit('article', where, data)
    if res:
        return returnData(2001, '修改成功', res)
    else:
        return returnData(2002, '数据无变化')


# 查询
def articleQuery(model, where):
    res = model.getOneData('article', where)
    if res:
        return returnData(2001, '查找成功', res)
    else:
        return returnData(2002, '无数据')


# 程序入口
@app.route('/', methods=['GET', 'POST'])
def index():
    try:
        # 获取参数
        reqData = request.args
        # 字段值处理
        if request.method == "POST":
            formData = {
                "title": htmlscape(request.form['title']),
                "categories": htmlscape(request.form['categories']),
                "keywords": htmlscape(request.form['keywords']),
                "content": htmlscape(request.form['content']),
            }

        # 实例化数据库
        if (reqData['db'] == 'mysql'):
            model = MysqlModel()
        elif (reqData['db'] == 'mongodb'):
            model = MongodbModel()

        # 执行方法
        if (reqData['fun'] == 'lst'):
            # 获取列表
            return articleLst(model)
        elif (reqData['fun'] == 'add'):
            # 添加数据
            return articleAdd(model, formData)
        elif (reqData['fun'] == 'del'):
            # 删除数据
            return articleDel(model, reqData)
        elif reqData['fun'] == 'edit':
            # 修改数据
            return articleEdit(model, reqData, formData)
        elif reqData['fun'] == 'query':
            # 查询数据
            return articleQuery(model, reqData)
    except ValueError:
        print("err")


# 启动服务
if __name__ == "__main__":
    app.run('localhost', 8855)
