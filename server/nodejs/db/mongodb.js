const mongodb = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectID
const url = 'mongodb://localhost:27017/'
const dbname='article'

module.exports = function () {
    this.getAllData = function (table,func) {
        mongodb.connect(url,{useNewUrlParser:true},(err,db)=>{
            if(err){
                throw err;
            }
            let dbs=db.db(dbname);
            dbs.collection(table).find({}).toArray((err,result)=>{
                if(err){
                    throw err;
                }
                //关闭数据库
                db.close();
                //返回数据
                func(result)
            })
        })
    }
    this.getOneData = function (table, where=[],func) {
        mongodb.connect(url,{useNewUrlParser:true},(err,db)=>{
            if(err){
                throw err;
            }
            let dbs=db.db(dbname);
            let where_q={'_id':new ObjectId(where['id'])}
            dbs.collection(table).find(where_q).toArray((err,result)=>{
                if(err){
                    throw err;
                }
                //关闭数据库
                db.close();
                func(result);
            })
        })
    }
    this.add = function (table, data,func) {
        mongodb.connect(url,{useNewUrlParser:true},(err,db)=>{
            if(err){
                throw err;
            }
            let dbs=db.db(dbname);
            dbs.collection(table).insert(data,(err,result)=>{
                if(err){
                    throw err;
                }
                //关闭数据库
                db.close();
                func(result)
            })
        })
    }
    this.edit = function (table, where, data,func) {
        mongodb.connect(url,{useNewUrlParser:true},(err,db)=>{
            if(err){
                throw err;
            }
            let dbs=db.db(dbname);
            let where_e={'_id':new ObjectId(where['id'])}
            let updata={$set:data}
            dbs.collection(table).updateOne(where_e,updata,(err,result)=>{
                if(err){
                    throw err;
                }
                //关闭数据库
                db.close();
                func(result);
            })
        })
    }
    this.del = function (table, where=[],func) {
        mongodb.connect(url,{useNewUrlParser:true},(err,db)=>{
            if(err){
                throw err;
            }
            let dbs=db.db(dbname);
            let where_d={'_id':new ObjectId(where['id'])}
            dbs.collection(table).deleteOne(where_d,(err,result)=>{
                if(err){
                    throw err;
                }
                //关闭数据库
                db.close();
                func(result)
            })
        })
    }
}