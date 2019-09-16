define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CK = /** @class */ (function () {
        function CK(name, value) {
            if (value === void 0) { value = null; }
            if (value === '') {
                this.delCookie(name);
            }
            else {
                this.setCookie(name, value);
            }
            if (value === null) {
                this.getCookie(name);
            }
        }
        CK.prototype.setCookie = function (name, value) {
            var Day = 10;
            var exp = new Date();
            exp.setTime(exp.getTime() + Day * 20 * 60 * 60 * 1000);
            document.cookie = name + '=' + escape(value) + ";expires=" + exp.toUTCString();
        };
        CK.prototype.getCookie = function (name) {
            var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
            if ((arr = document.cookie.match(reg))) {
                return unescape(arr[2]);
            }
            else {
                return null;
            }
        };
        CK.prototype.delCookie = function (name) {
            var exp = new Date();
            exp.setTime(exp.getTime() - 1);
            var cval = this.getCookie(name);
            if (cval != null) {
                document.cookie = name + "=" + cval + ";expires=" + exp.toUTCString;
            }
        };
        return CK;
    }());
    exports.CK = CK;
});
