const mysql = require('mysql')
const dbname = 'article'
class mysqlModel {

    constructor() {
        this.connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            port: '3306',
            database: dbname
        })
        this.connection.connect();
    }
    getAllData(table, func) {
        let sql = `select * from ${table}`
        this.connection.query(sql, (err, res) => {
            if (err) {
                throw err;
            }
            //返回数据
            func(res)
        })
        //关闭数据库
        this.connection.end();
    }
    getOneData(table, where = [], func) {
        let sql = `select * from ${table} where id=${where['id']}`
        this.connection.query(sql, (err, res) => {
            if (err) {
                throw err;
            }
            //返回数据
            func(res)
        })
        //关闭数据库
        this.connection.end();
    }
    add(table, data, func) {
        let sql = `insert into ${table}(title,categories,keywords,content) values('${data.title}','${data.categories}','${data.keywords}','${data.content}')`
        this.connection.query(sql, (err, res) => {
            if (err) {
                throw err;
            }
            //返回数据
            func(res)
        })
        //关闭数据库
        this.connection.end();
    }
    edit(table, where, data, func) {
        let sql = `update ${table} set title='${data.title}',categories='${data.categories}',keywords='${data.keywords}',content='${data.content}' where id=${where['id']}`
        this.connection.query(sql, (err, res) => {
            if (err) {
                throw err;
            }
            //返回数据
            func(res)
        })
        //关闭数据库
        this.connection.end();
    }
    del(table, where, func) {
        let sql = `delete from ${table} where id=${where['id']}`
        this.connection.query(sql, (err, res) => {
            if (err) {
                throw err;
            }
            //返回数据
            func(res)
        })
        //关闭数据库
        this.connection.end()
    }
}
module.exports = mysqlModel;