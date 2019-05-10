define(["require", "exports", "./request"], function (require, exports, request_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var articleController = /** @class */ (function () {
        function articleController() {
            this.url = 'http://localhost:8855';
        }
        articleController.prototype.read = function (id) {
            var data = {
                url: this.url + '?id=' + id,
                data: {},
                method: "GET"
            };
            request_1.req.text(data, function (e) {
                console.log(e);
            });
        };
        articleController.prototype.lst = function (page) {
            var data = {
                url: this.url,
                data: {},
                method: "GET"
            };
            request_1.req.text(data, function (e) {
                console.log(e);
            });
        };
        articleController.prototype.add = function (obj) {
            var data = {
                url: this.url,
                data: obj,
                method: "POST"
            };
            console.log(data);
            // req.text(data, (e: any) => {
            //     console.log(e)
            // })
        };
        articleController.prototype.edit = function (obj) {
            var data = {
                url: this.url,
                data: {},
                method: "POST"
            };
            request_1.req.text(data, function (e) {
                console.log(e);
            });
        };
        articleController.prototype.del = function (id) {
            var data = {
                url: this.url,
                data: {},
                method: "GET"
            };
            request_1.req.text(data, function (e) {
                console.log(e);
            });
        };
        return articleController;
    }());
    var article = new articleController();
    exports.article = article;
});
