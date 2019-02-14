import mysql.connector


class mysqlModel:
    # mysql数据路类
    def __init__(self):
        connection = mysql.connector.connect(
            host="localhost", user="root", password="root", database="article")
        self.db = connection.cursor()
        # db.execute('select * from article')
        # res=db.fetchall()
        # print(res)

    def getAllData(self):
        # print("************************")
        # print(self.db)
        # print("************************")
        # ddemo = self.db
        # ddemo.execute("SELECT * FROM article")
        # res = ddemo.fetchall()
        # print(res)
        # for x in res:
        #     print(x)
        aaa=self.db
        aaa.execute('select * from article')
        res=aaa.fetchall()
        print(res)
        # return 'mysql demo function()'
