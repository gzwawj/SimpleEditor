define(function (require, exports, module) {
    function Cookie() {

    }
    module.exports = Cookie
    /**
     * 设置cookie值
     */
    Cookie.prototype.setCookie = function (name, value) {
        let Days = 10;
        let exp = new Date();
        exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
        document.cookie =
            name + "=" + escape(value) + ";expires=" + exp.toGMTString();
    }
    /**
     * 获取cookie值
     */
    Cookie.prototype.getCookie = function (name) {
        let arr,
            reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if ((arr = document.cookie.match(reg))) return unescape(arr[2]);
        else return null;
    }
    /**
     * 删除cookie值
     */
    Cookie.prototype.delCookie = function (name) {
        let exp = new Date();
        exp.setTime(exp.getTime() - 1);
        let cval = getCookie(name);
        if (cval != null)
            document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
    }
    Cookie.prototype.demo=function(){
        console.log(123)
    }
});