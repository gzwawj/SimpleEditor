var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "marked", "clipboard"], function (require, exports, marked_1, clipboard_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    marked_1 = __importDefault(marked_1);
    clipboard_1 = __importDefault(clipboard_1);
    if (clipboard_1.default.isSupported()) {
        new clipboard_1.default('li');
    }
    var ajax_text = function (dom, url, data, method) {
        if (method === void 0) { method = "POST"; }
        return dom.ajax({
            url: url,
            data: data,
            method: method,
            type: "JSON"
        });
    };
    exports.ajax_text = ajax_text;
    var ajax_file = function (dom, url, data) {
        return dom.ajax({
            url: url,
            data: data,
            method: "POST",
            type: "JSON",
            processData: false,
            contentType: false,
        });
    };
    exports.ajax_file = ajax_file;
    var article_list_html = function (data) {
        var str = "";
        for (var i in data) {
            str += "\n        <li>\n            <div class=\"article-item\">\n                <div class=\"title\"><a href=\"javascript:void(0)\" data-article-id=" + data[i].id + ">" + data[i].title + "</a></div>\n                <div>\u5206\u7C7B:" + data[i].categories + "</div>\n                <div>\u5173\u952E\u5B57:" + data[i].keywords + "</div>\n                <div>\u65F6\u95F4:</div>\n            </div>\n        </li>\n        ";
        }
        return str;
    };
    exports.article_list_html = article_list_html;
    var images_list_html = function (data, marker) {
        if (marker === void 0) { marker = ""; }
        var str = "";
        for (var i in data) {
            str += "<li title=\"\u70B9\u51FB\u590D\u5236\" data-clipboard-text=\"//" + data[i].key + "\"><img src=\"//" + data[i].key + "\"></li>";
        }
        if (marker) {
            str += "<b class=\"loading\" data-qiniu-marker=\"" + marker + "\">\u52A0\u8F7D\u66F4\u591A</b>";
        }
        return str;
    };
    exports.images_list_html = images_list_html;
    var _time = null;
    var delay_save = function (dom, key) {
        if (_time != null) {
            clearTimeout(_time);
        }
        _time = setTimeout(function () {
            dom(".sub").css({ "display": "block" });
            var val = dom("#form-content").val();
            dom(".code-preview").val(marked_1.default(val));
            dom(".effect-preview").val(marked_1.default(val));
        }, 1000);
    };
    exports.delay_save = delay_save;
    var alerter = function (dom, msg) {
        dom(".alerter-content").text(msg);
        dom(".alerter").css({ "display": "block" });
        dom(".alerter").fadeOut(3000);
        dom(".add").hide();
        dom(".save").hide();
        dom(".post").hide();
        dom(".images").hide();
        dom(".shade").hide();
    };
    exports.alerter = alerter;
});
