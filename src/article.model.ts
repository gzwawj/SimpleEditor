import sqlite from 'sqlite3'
import yml from 'yaml'
import fs from 'fs'

class ArticleModel {
    private dbpath
    private table
    private db
    public data
    constructor(dbpath: string, table: string) {
        let that = this
        that.dbpath = dbpath
        that.table = table
        that.db = new sqlite.Database(that.dbpath, function (e) {
            if (e !== null) {
                throw e;
            } else {
                that.createTable()
            }
        })
    }
    public createTable() {
        let sqlstr: string = `
        CREATE TABLE "main"."${this.table}" (
            "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
            "title" TEXT NOT NULL,
            "categories" TEXT NOT NULL,
            "keywords" TEXT NOT NULL,
            "content" TEXT NOT NULL
          );
        `
        this.db.run(sqlstr, (res) => {
            console.log("createtable")
        })

    }

    public async query(id: number = 0) {
        let that = this
        let sqlstr: string = ""
        if (id == 0) {
            sqlstr = `SELECT * FROM ${this.table}`
            return new Promise(function (resolve, reject) {
                that.db.all(sqlstr, function (err, res) {
                    if (err) reject(err)
                    resolve(res)
                })
            })
        } else {
            sqlstr = `SELECT * FROM ${this.table} WHERE id =${id}`
            return new Promise(function (resolve, reject) {
                that.db.get(sqlstr, function (err, res) {
                    if (err) reject(err)
                    resolve(res)
                })
            })
        }
    }
    public async create(data: object) {
        let that = this
        let sqlstr: string = `INSERT INTO ${this.table}(title,categories,keywords,content) VALUES('${data['title']}','${data['categories']}','${data['keywords']}','${data['content']}')`
        return new Promise(function (resolve, reject) {
            that.db.run(sqlstr, function (err, res) {
                if (err) reject(err)
                resolve(res)
            })
        })
    }
    public async editor(id: number, data: object) {
        let that = this
        let sqlstr: string = `UPDATE ${this.table} SET title='${data['title']}',categories='${data['categories']}',keywords='${data['keywords']}',content='${data['content']}' WHERE id=${id}`
        return new Promise(function (resolve, reject) {
            that.db.run(sqlstr, function (err, res) {
                if (err) reject(err)
                resolve(res)
            })
        })
    }
    public async delete(id: number) {
        let that = this
        let sqlstr: string = `DELETE FROM ${this.table} WHERE id=${id}`
        return new Promise(function (resolve, reject) {
            that.db.run(sqlstr, function (err, res) {
                if (err) reject(err)
                resolve(res)
            })
        })
    }
}

let config = yml.parse(fs.readFileSync('config.yml', 'utf8'));
let articleModel = new ArticleModel(config.database.db, config.database.table)

export { articleModel }