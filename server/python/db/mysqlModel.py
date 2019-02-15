import mysql.connector
import pandas as pd


class MysqlModel():
    # mysql数据路类
    def __init__(self):
        # 方案一
        self._db = mysql.connector.connect(
            host="localhost",
            user="root",
            password="root",
            database="article",
            raise_on_warnings=True)
        # 方案二
        # self._db=_conn()

    def _conn(self):
        _cur = mysql.connector.connect(
            host="localhost", user="root", password="root", database="article")
        return _cur

    def getAllData(self, table):
        # 连接数据库
        _model = self._db.cursor(dictionary=True)
        # 构建sql语句
        sql = "select * from %s" % (table)
        # 执行sql语句
        _model.execute(sql)
        # 获取所有数据
        res = _model.fetchall()
        # 获取查询结果的字段描述
        # col_result = _model.description
        # 获取表头数据excel，需要import pandas as pd
        # df = pd.DataFrame(list(res))
        # 返回数据
        return res

    def getOneData(self, table, where):
        # 连接数据库
        _model = self._db.cursor(dictionary=True)
        # 构建sql语句
        sql = f"select * from {table} where id='{where['id']}'"
        # 执行sql语句
        _model.execute(sql)
        # 获取所有数据
        res = _model.fetchall()
        # 返回数据
        return res

    def add(self, table, data):
        # 连接数据库
        _model = self._db.cursor(dictionary=True)
        # 构建sql语句
        sql = f"insert into {table}(title,categories,keywords,content) values('{data['title']}','{data['categories']}','{data['keywords']}','{data['content']}')"
        # 执行sql语句
        _model.execute(sql)
        # 数据表有更新需要使用此语句
        self._db.commit()
        # 执行结果
        res = _model.rowcount
        # 返回数据
        return res

    def edit(self, table, where, data):
        # 连接数据库
        _model = self._db.cursor(dictionary=True)
        # 构建sql语句
        sql = f"update {table} set title='{data['title']}',categories='{data['categories']}',keywords='{data['keywords']}',content='{data['content']}' where id='{where['id']}'"
        # 执行sql语句
        _model.execute(sql)
        # 数据表有更新需要使用此语句
        self._db.commit()
        # 执行结果
        res = _model.rowcount
        # 返回数据
        return res

    def delete(self, table, where):
        # 连接数据库
        _model = self._db.cursor(dictionary=True)
        # 构建sql语句
        sql = f"delete from {table} where id={where['id']}"
        # 执行sql语句
        _model.execute(sql)
        # 数据表有更新需要使用此语句
        self._db.commit()
        # 执行结果
        res = _model.rowcount
        # 返回数据
        return res