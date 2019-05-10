var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "jquery"], function (require, exports, jquery_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    jquery_1 = __importDefault(jquery_1);
    var requestController = /** @class */ (function () {
        function requestController() {
        }
        requestController.prototype.text = function (obj, func) {
            jquery_1.default.ajax({
                url: obj.url,
                data: obj.data,
                method: obj.method,
                type: 'JSON',
                success: function (res) {
                    //返回data数据
                    func(res);
                },
                error: function () {
                    console.log('error');
                }
            });
        };
        requestController.prototype.file = function (obj, func) {
            jquery_1.default.ajax({
                url: obj.url,
                data: obj.data,
                method: 'POST',
                type: 'JSON',
                processData: false,
                contentType: false,
                success: function (res) {
                    //返回data数据
                    func(res);
                },
                error: function () {
                    console.log('error');
                }
            });
        };
        return requestController;
    }());
    var req = new requestController();
    exports.req = req;
});
