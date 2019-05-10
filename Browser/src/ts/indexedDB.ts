class indexedDBController {
    private dbname: string = ''
    private version: number = 1
    private table: string = ''

    private dbs: any = ''
    private store: any = ''
    constructor(db: string, v: number) {
        if (!window.indexedDB) {
            alert('浏览器不支持')
        } else {
            this.dbname = db
            this.version = v
        }
    }
    public connect(tablename: string) {
        let _this = this
        _this.table = tablename
        let request = indexedDB.open(this.dbname, this.version);
        //数据库打开失败
        request.onerror = function () {
            alert('数据库打开失败')
            // return _this.returnData(2002, '', '数据库打开失败');
        }
        request.onupgradeneeded = function (event: any) {
            _this.dbs = event.target.result;
            _this.dbs.createObjectStore(tablename)
        }
        //数据库打开成功
        request.onsuccess = function (event: any) {
            _this.dbs = event.target.result;
        }
    }
    public add(data: any, key: number, func: any) {
        let _this = this
        let store = _this.dbs.transaction(_this.table, "readwrite").objectStore(_this.table)
        let res = store.put(data, key)
        res.onsuccess = () => {
            func(_this.returnData(2001, res, '已保存'))
        }
        res.onerror = () => {
            func(_this.returnData(2002, '', '保存失败'))
        }
    }
    public del(key: number, func: any) {
        let _this = this
        let store = _this.dbs.transaction(_this.table, "readwrite").objectStore(_this.table)
        let res = store.delete(key)
        res.onsuccess = () => {
            func(_this.returnData(2001, res, '删除成功'))
        }
        res.onerror = () => {
            func(_this.returnData(2002, '', '删除失败'))
        }
    }
    public edit(data: any, key: number, func: any) {
        let _this = this
        let store = _this.dbs.transaction(_this.table, "readwrite").objectStore(_this.table)
        let res = store.put(data, key)
        res.onsuccess = () => {
            func(_this.returnData(2001, res, '修改成功'))
        }
        res.onerror = () => {
            func(_this.returnData(2002, '', '修改失败'))
        }
    }
    public lst(page: number = 1, func: any) {
        let _this = this
        let store = _this.dbs.transaction(_this.table, "readwrite").objectStore(_this.table)
        let res = store.getAll()
        res.onsuccess = () => {
            func(_this.returnData(2001, res, '查询成功'))
        }
        res.onerror = () => {
            func(_this.returnData(2002, '', '查询失败'))
        }
    }
    public read(key: number, func: any) {
        let _this = this
        let store = _this.dbs.transaction(_this.table, "readwrite").objectStore(_this.table)
        let res = store.get(key)
        res.onsuccess = () => {
            func(_this.returnData(2001, res, '查询成功'))
        }
        res.onsuccess = () => {
            func(_this.returnData(2002, '', '查询失败'))
        }
    }
    public clear(func: any = null) {
        let _this = this
        let store = _this.dbs.transaction(_this.table, "readwrite").objectStore(_this.table)
        let res = store.clear()
        res.onsuccess = () => {
            func(_this.returnData(2001, '', '清除成功'))
        }
        res.onerror = () => {
            func(_this.returnData(2002, '', '清除失败'))
        }
    }
    public count(func:any){
        let _this = this
        let store = _this.dbs.transaction(_this.table, "readwrite").objectStore(_this.table)
        let res = store.count()
        res.onsuccess = () => {
            func(_this.returnData(2001, res, '清除成功'))
        }
        res.onerror = () => {
            func(_this.returnData(2002, '', '清除失败'))
        }
    }
    private returnData(code: number, data: any, msg: string) {
        return {
            "code": code,
            "data": data,
            "msg": msg
        }
    }
}

let idb = new indexedDBController('article', 1)
export { idb }