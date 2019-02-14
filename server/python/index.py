from flask import Flask
from flask import request
# import sys
# sys.path.append('./db')
from db.mysqlModel import *
from db.mongodbModel import *

app = Flask(__name__)


# 获取列表
def articleLst(model):
    model.getAllData()


# 添加数据
def articleAdd(model, data):
    return model.demo()


# 删除
def articleDel(model, data):
    return model.demo()


# 修改
def articleEdit(model, data):
    return model.demo()


# 查询
def articleQuery(model, data):
    return model.demo()


# 程序入口
@app.route('/', methods=['GET', 'POST'])
def index():
    # 获取参数
    reqData = request.args
    # 实例化数据库
    if (reqData['db'] == 'mysql'):
        model = mysqlModel()
        model.getAllData()
    elif (reqData['db'] == 'mongodb'):
        model = mongodbModel()

    # 执行方法
    if (reqData['fun'] == 'lst'):
        # 获取列表
        return articleLst(model)
    elif (reqData['fun'] == 'add'):
        # 添加数据
        return articleAdd(model, reqData)
    elif (reqData['fun'] == 'del'):
        # 删除数据
        return articleDel(model, reqData)
    elif reqData['fun'] == 'edit':
        # 修改数据
        return articleEdit(model, reqData)
    elif reqData['fun'] == 'query':
        # 查询数据
        return articleQuery(model, reqData)


# 启动服务
if __name__ == "__main__":
    app.run('localhost', 8855)
