define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var indexedDBController = /** @class */ (function () {
        function indexedDBController(db, v) {
            this.dbname = '';
            this.version = 1;
            this.table = '';
            this.dbs = '';
            this.store = '';
            if (!window.indexedDB) {
                alert('浏览器不支持');
            }
            else {
                this.dbname = db;
                this.version = v;
            }
        }
        indexedDBController.prototype.connect = function (tablename) {
            var _this = this;
            _this.table = tablename;
            var request = indexedDB.open(this.dbname, this.version);
            //数据库打开失败
            request.onerror = function () {
                alert('数据库打开失败');
                // return _this.returnData(2002, '', '数据库打开失败');
            };
            request.onupgradeneeded = function (event) {
                _this.dbs = event.target.result;
                _this.dbs.createObjectStore(tablename);
            };
            //数据库打开成功
            request.onsuccess = function (event) {
                _this.dbs = event.target.result;
            };
        };
        indexedDBController.prototype.add = function (data, key, func) {
            var _this = this;
            var store = _this.dbs.transaction(_this.table, "readwrite").objectStore(_this.table);
            var res = store.put(data, key);
            res.onsuccess = function () {
                func(_this.returnData(2001, res, '已保存'));
            };
            res.onerror = function () {
                func(_this.returnData(2002, '', '保存失败'));
            };
        };
        indexedDBController.prototype.del = function (key, func) {
            var _this = this;
            var store = _this.dbs.transaction(_this.table, "readwrite").objectStore(_this.table);
            var res = store.delete(key);
            res.onsuccess = function () {
                func(_this.returnData(2001, res, '删除成功'));
            };
            res.onerror = function () {
                func(_this.returnData(2002, '', '删除失败'));
            };
        };
        indexedDBController.prototype.edit = function (data, key, func) {
            var _this = this;
            var store = _this.dbs.transaction(_this.table, "readwrite").objectStore(_this.table);
            var res = store.put(data, key);
            res.onsuccess = function () {
                func(_this.returnData(2001, res, '修改成功'));
            };
            res.onerror = function () {
                func(_this.returnData(2002, '', '修改失败'));
            };
        };
        indexedDBController.prototype.lst = function (page, func) {
            if (page === void 0) { page = 1; }
            var _this = this;
            var store = _this.dbs.transaction(_this.table, "readwrite").objectStore(_this.table);
            var res = store.getAll();
            res.onsuccess = function () {
                func(_this.returnData(2001, res, '查询成功'));
            };
            res.onerror = function () {
                func(_this.returnData(2002, '', '查询失败'));
            };
        };
        indexedDBController.prototype.read = function (key, func) {
            var _this = this;
            var store = _this.dbs.transaction(_this.table, "readwrite").objectStore(_this.table);
            var res = store.get(key);
            res.onsuccess = function () {
                func(_this.returnData(2001, res, '查询成功'));
            };
            res.onerror = function () {
                func(_this.returnData(2002, '', '查询失败'));
            };
        };
        indexedDBController.prototype.clear = function (func) {
            if (func === void 0) { func = null; }
            var _this = this;
            var store = _this.dbs.transaction(_this.table, "readwrite").objectStore(_this.table);
            var res = store.clear();
            res.onsuccess = function () {
                func(_this.returnData(2001, '', '清除成功'));
            };
            res.onerror = function () {
                func(_this.returnData(2002, '', '清除失败'));
            };
        };
        indexedDBController.prototype.count = function (func) {
            var _this = this;
            var store = _this.dbs.transaction(_this.table, "readwrite").objectStore(_this.table);
            var res = store.count();
            res.onsuccess = function () {
                func(_this.returnData(2001, res, '清除成功'));
            };
            res.onerror = function () {
                func(_this.returnData(2002, '', '清除失败'));
            };
        };
        indexedDBController.prototype.returnData = function (code, data, msg) {
            return {
                "code": code,
                "data": data,
                "msg": msg
            };
        };
        return indexedDBController;
    }());
    var idb = new indexedDBController('article', 1);
    exports.idb = idb;
});
