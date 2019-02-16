import pymongo
from bson.objectid import ObjectId


class MongodbModel:
    # mongodb数据库
    def __init__(self):
        # 连接数据库
        _client = pymongo.MongoClient("mongodb://localhost:27017/")
        # 使用数据库
        self._db = _client['article']

    def getAllData(self, table):
        # 使用数据集
        _model = self._db[table]
        # 返回所有数据
        res = _model.find()
        # 定义数组
        arr = []
        for v in res:
            arr.append({
                "id": str(v['_id']),
                "title": v['title'],
                "categories": v['categories'],
                "keywords": v['keywords'],
                "content": v['content']
            })
        return arr

    def getOneData(self, table, where):
        # 使用数据集
        _model = self._db[table]
        # 构建查询条件
        where_q = {'_id': ObjectId(where['id'])}
        # 返回结果
        res = _model.find_one(where_q)
        # 定义数组
        arr = []
        if res:
            arr.append({
                "id": str(res['_id']),
                "title": res['title'],
                "categories": res['categories'],
                "keywords": res['keywords'],
                "content": res['content']
            })
            return arr

    def add(self, table, data):
        # 使用数据集
        _model = self._db[table]
        # 插入数据
        res = _model.insert_one(data)
        # 返回文档id
        insid = res.inserted_id
        if insid:
            return 1
        else:
            return 0

    def edit(self, table, where, data):
        # 使用数据集
        _model = self._db[table]
        # 查询条件
        where_e = {'_id': ObjectId(where['id'])}
        # 修改的数据
        updata = {"$set": data}
        # 执行修改
        res = _model.update_one(where_e, updata)
        # 返回执行结果
        return res.modified_count

    def delete(self, table, where):
        # 使用数据集
        _model = self._db[table]
        # 条件
        where_d = {'_id': ObjectId(where['id'])}
        # 执行删除
        res = _model.delete_one(where_d)
        # 返回结果
        return res.deleted_count