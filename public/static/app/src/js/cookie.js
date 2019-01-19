define(function (require, exports, module) {
    /**
     * 设置cookie值
     */
    let setCookie = function (name, value) {
        let Days = 10;
        let exp = new Date();
        exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
        document.cookie =
            name + "=" + escape(value) + ";expires=" + exp.toGMTString();
    }
    /**
     * 获取cookie值
     */
    let getCookie = function (name) {
        let arr,
            reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if ((arr = document.cookie.match(reg))) return unescape(arr[2]);
        else return null;
    }
    /**
     * 删除cookie值
     */
    let delCookie = function (name) {
        let exp = new Date();
        exp.setTime(exp.getTime() - 1);
        let cval = getCookie(name);
        if (cval != null)
            document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
    }
    module.exports = {
        setCookie: setCookie,
        getCookie: getCookie,
        delCookie: delCookie
    }
});