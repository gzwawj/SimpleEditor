var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "jquery", "./action"], function (require, exports, jquery_1, action_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    jquery_1 = __importDefault(jquery_1);
    jquery_1.default(".add-menu").on("click", function () {
        jquery_1.default(".add").toggle();
        jquery_1.default(".shade").show();
    });
    jquery_1.default(".save-menu").on("click", function () {
        jquery_1.default(".save").toggle();
        jquery_1.default(".shade").show();
    });
    jquery_1.default(".post-menu").on("click", function () {
        jquery_1.default(".post").toggle();
        jquery_1.default(".shade").show();
    });
    jquery_1.default(".images-menu").on("click", function () {
        jquery_1.default(".images").toggle();
        jquery_1.default(".shade").show();
    });
    jquery_1.default(".shade").on("click", function () {
        jquery_1.default(".add").hide();
        jquery_1.default(".save").hide();
        jquery_1.default(".post").hide();
        jquery_1.default(".images").hide();
        jquery_1.default(".shade").hide();
    });
    jquery_1.default(function () {
        //获取文章
        action_1.ajax_text(jquery_1.default, "http://localhost:3000/article", {}, "GET").then(function (data) {
            if (data.code == 2001) {
                var str = action_1.article_list_html(data.data);
                jquery_1.default(".article-list").append(str);
            }
            action_1.alerter(jquery_1.default, data.msg);
        });
        //获取图片
        action_1.ajax_text(jquery_1.default, "http://localhost:3000/qiniu", {}).then(function (data) {
            if (data.code == 2001) {
                jquery_1.default('.images-list').empty();
                var str = action_1.images_list_html(data.data);
                jquery_1.default('.images-list').append(str);
            }
        });
    });
    jquery_1.default(".article-list").on("click", "a", function (e) {
        var _id = e.target.dataset.articleId;
        action_1.ajax_text(jquery_1.default, "http://localhost:3000/article/" + _id, {}, "GET").then(function (data) {
            if (data.code == 2001) {
                jquery_1.default("#form-id").val(data.data.id);
                jquery_1.default("#form-title").val(data.data.title);
                jquery_1.default("#form-content").val(data.data.content);
                jquery_1.default("#form-categories").val(data.data.categories);
                jquery_1.default("#form-keywords").val(data.data.keywords);
                action_1.delay_save(jquery_1.default);
            }
            action_1.alerter(jquery_1.default, data.msg);
        });
    });
    //添加文件
    jquery_1.default(".add-file").on("click", function () {
        jquery_1.default("#form-files").trigger("click");
        jquery_1.default("#form-files").on("change", function (e) {
            var name = e.target.value.substring(e.target.value.lastIndexOf("\\") + 1);
            jquery_1.default(".file-name").text(name ? name : "选择文件");
            // 提交文件
        });
    });
    //保存文章
    jquery_1.default(".artic-save").on("click", function () {
        var url = "", id = jquery_1.default("#form-id").val(), title = jquery_1.default("#form-title").val(), content = jquery_1.default("#form-content").val(), categories = jquery_1.default("#form-categories").val(), keywords = jquery_1.default("#form-keywords").val();
        var obj = {
            title: title,
            content: content,
            categories: categories,
            keywords: keywords,
        };
        //提交文章
        if (id) {
            url = "http://localhost:3000/article/editor/" + id;
        }
        else {
            url = "http://localhost:3000/article/create";
        }
        action_1.ajax_text(jquery_1.default, url, obj).then(function (data) {
            if (data.code == 2001) {
                action_1.alerter(jquery_1.default, data.msg);
            }
        });
    });
    //下载文件
    jquery_1.default(".artic-down").on("click", function () {
        console.log("下载文件");
    });
    //发布文章
    jquery_1.default(".artic-post").on("click", function () {
        var email = jquery_1.default("#email").val(), title = jquery_1.default("#form-title").val(), content = jquery_1.default("#form-content").val();
        // 发布文章
        if (email === "" || title === "" || content === "") {
            action_1.alerter(jquery_1.default, "邮箱地址、标题、内容不能为空");
        }
        else {
            action_1.ajax_text(jquery_1.default, "http://localhost:3000/email", {
                email: email,
                title: title,
                content: content
            }).then(function (data) {
                if (data.code == 2001) {
                    action_1.alerter(jquery_1.default, data.msg);
                }
            });
        }
    });
    //添加图片
    jquery_1.default(".add-img").on("click", function () {
        jquery_1.default("#img-file").trigger("click");
        jquery_1.default("#img-file").on("change", function (e) {
            var name = e.target.value.substring(e.target.value.lastIndexOf("\\") + 1);
            jquery_1.default(".img-name").text(name ? name : "选择文件");
        });
    });
    jquery_1.default(".img-upload").on("click", function () {
        var file = document.querySelector("#img-file");
        var formData = new FormData();
        formData.append("qiniufile", file.files[0]);
        action_1.ajax_file(jquery_1.default, "http://localhost:3000/qiniu/addfile", formData).then(function (data) {
            if (data.code == 2001) {
                action_1.alerter(jquery_1.default, data.msg);
            }
        });
    });
    jquery_1.default(".move-left").on("click", function () {
        jquery_1.default(".images-items").css({ "left": "0" });
    });
    jquery_1.default(".move-right").on("click", function () {
        jquery_1.default(".images-items").css({ "left": "-600px" });
    });
    jquery_1.default(".images-list").on("click", ".loading", function (e) {
        var marker = e.target.dataset.qiniuMarker;
        action_1.ajax_text(jquery_1.default, "http://localhost:3000/qiniu", { marker: marker }).then(function (data) {
            if (data.code == 2001) {
                jquery_1.default('.images-list').empty();
                var str = action_1.images_list_html(data.data);
                jquery_1.default('.images-list').append(str);
            }
        });
    });
    //编辑文章
    jquery_1.default("#form-content").bind("keyup", function () {
        action_1.delay_save(jquery_1.default);
    });
    //全屏预览
    var _full = true;
    jquery_1.default(".full-screen-preview-btn").on("click", function () {
        if (_full) {
            jquery_1.default("#edit").css({ "width": "0%", "display": "none" });
            jquery_1.default("#preview").css({ "width": "100%", "display": "block" });
            jquery_1.default(".effect-preview").css({ "display": "block" });
            jquery_1.default(".code-preview").css({ "display": "none" });
            _full = !_full;
        }
        else {
            jquery_1.default("#edit").css({ "width": "100%", "display": "block" });
            jquery_1.default("#preview").css({ "width": "0%", "display": "none" });
            jquery_1.default(".effect-preview").css({ "display": "block" });
            jquery_1.default(".code-preview").css({ "display": "none" });
            _full = !_full;
        }
    });
    // 分屏显示
    var _split = true;
    jquery_1.default(".split-screen-preview-btn").on("click", function () {
        if (_split) {
            jquery_1.default("#edit").css({ "width": "49.9%", "display": "block" });
            jquery_1.default("#preview").css({ "width": "49.9%", "display": "block" });
            jquery_1.default(".effect-preview").css({ "display": "block" });
            jquery_1.default(".code-preview").css({ "display": "none" });
            _split = !_split;
        }
        else {
            jquery_1.default("#edit").css({ "width": "100%", "display": "block" });
            jquery_1.default("#preview").css({ "width": "0%", "display": "none" });
            jquery_1.default(".effect-preview").css({ "display": "block" });
            jquery_1.default(".code-preview").css({ "display": "none" });
            _split = !_split;
        }
    });
    // 代码显示
    var _code = true;
    jquery_1.default(".code-preview-btn").on("click", function () {
        if (_code) {
            jquery_1.default("#edit").css({ "width": "49.9%", "display": "block" });
            jquery_1.default("#preview").css({ "width": "49.9%", "display": "block" });
            jquery_1.default(".effect-preview").css({ "display": "none" });
            jquery_1.default(".code-preview").css({ "display": "block" });
            _code = !_code;
        }
        else {
            jquery_1.default("#edit").css({ "width": "49.9%", "display": "block" });
            jquery_1.default("#preview").css({ "width": "49.9%", "display": "block" });
            jquery_1.default(".effect-preview").css({ "display": "block" });
            jquery_1.default(".code-preview").css({ "display": "none" });
            _code = !_code;
        }
    });
});
