var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "./request", "jquery", "./md", "./action", "./style", "./config"], function (require, exports, request_1, jquery_1, md_1, action_1, style_1, config_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    jquery_1 = __importDefault(jquery_1);
    config_1 = __importDefault(config_1);
    var fcontent = document.querySelector('#form-content');
    var effectPreview = document.querySelector('.effect-preview');
    var codePreview = document.querySelector('.code-preview');
    /**
     * 添加文件
     * @param files
     */
    var fileAction = function (files) {
        var formData = new FormData();
        formData.append('files', files[0], files[0].name);
        var data = {
            url: 'http://localhost:8095/server/php/index.php?fun=mdfile&db=mysql',
            data: formData
        };
        request_1.req.file(data, function (e) {
            var res = JSON.parse(e);
            if (res.code == 2001) {
                fcontent.value = res.data;
                effectPreview.innerHTML = md_1.md(res.data);
                codePreview.value = md_1.md(res.data);
                action_1.delay_save('content', fcontent);
            }
        });
    };
    /**
     * 图片返回base64格式，文本返回内容
     * @param files
     * @param func
     */
    var imgPreview = function (files, func) {
        //实例化FileReader
        var file_reader = new FileReader();
        var file = files[0];
        if (/image+/.test(file.type)) {
            file_reader.onload = function () {
                func(this.result);
            };
            file_reader.readAsDataURL(file);
        }
        else if (/text+/.test(file.type)) {
            file_reader.onload = function () {
                func(this.result);
            };
            file_reader.readAsText(file);
        }
    };
    /**
     * 添加图片
     * @param files
     */
    var imgAction = function (files) {
        var formData = new FormData();
        formData.append('host', config_1.default.qiniu.host);
        formData.append('bucket', config_1.default.qiniu.bucket);
        formData.append('type', config_1.default.qiniu.upload.type);
        formData.append('file', files[0], files[0].name);
        var data = {
            url: 'http://static.codeinfo.top/qiniu/index/index',
            data: formData
        };
        request_1.req.file(data, function (e) {
            var res = JSON.parse(e);
            style_1.alerter(res.msg);
        });
    };
    /**
     * 循环图片列表
     */
    var img_arr = [];
    var forImg = function (marker, items) {
        var str = '';
        jquery_1.default('.images-list').empty();
        for (var i in img_arr) {
            str += "<li title=\"\u70B9\u51FB\u590D\u5236\" data-clipboard-text=\"//" + img_arr[i].key + "\"><img src=\"//" + img_arr[i].key + "\"></li>";
        }
        if (marker) {
            str += "<b class=\"loading\" data-qiniu-marker=\"" + marker + "\">\u52A0\u8F7D\u66F4\u591A</b>";
        }
        jquery_1.default('.images-list').append(str);
    };
    /**
     * 请求七牛云的图片
     * @param marker_str
     * @param limit
     */
    var lstImg = function (marker_str, limit) {
        if (marker_str === void 0) { marker_str = ''; }
        if (limit === void 0) { limit = 3; }
        var data = {
            url: 'http://static.codeinfo.top/qiniu/index/index',
            data: {
                host: config_1.default.qiniu.host,
                bucket: config_1.default.qiniu.bucket,
                type: config_1.default.qiniu.list.type,
                prefix: 'image',
                marker: marker_str,
                limit: limit
            },
            method: "GET"
        };
        request_1.req.text(data, function (e) {
            var res = JSON.parse(e);
            if (res.code == 2001) {
                for (var i in res.data.items) {
                    img_arr.push(res.data.items[i]);
                }
                forImg(res.data.marker, img_arr);
            }
            else {
                style_1.alerter(res.msg);
            }
        });
    };
    exports.lstImg = lstImg;
    var addFile = function (box_class, input_id, span_class, func) {
        var ffiles = document.querySelector(input_id);
        jquery_1.default(box_class).on('click', function () {
            jquery_1.default(input_id).trigger('click');
            jquery_1.default(input_id).on('change', function (e) {
                //添加文件名
                var url = e.target.value;
                var name = url.substring(url.lastIndexOf("\\") + 1);
                if (name) {
                    jquery_1.default(span_class).text(name);
                }
                else {
                    jquery_1.default(span_class).text('选择文件');
                }
                func(ffiles.files);
            });
        });
        /**
         * 拖拽添加文件
         * 允许文件放入事件
         */
        jquery_1.default(box_class).on('dragover', function (e) {
            // 取消默认浏览器拖拽效果
            e.originalEvent.preventDefault();
            e.originalEvent.stopPropagation();
        });
        /**
         * 拖拽添加文件
         * 文件放下事件
         */
        jquery_1.default(box_class).on('drop', function (e) {
            // 取消默认浏览器拖拽效果
            e.originalEvent.preventDefault();
            e.originalEvent.stopPropagation();
            var files = e.originalEvent.dataTransfer.files;
            jquery_1.default(span_class).text(files[0].name);
            //文件上传方法
            func(files);
        });
    };
    var file = function () {
        addFile('.add-file', '#form-files', '.file-name', function (e) {
            fileAction(e);
        });
        addFile('.add-img', '#img-file', '.img-name', function (e) {
            jquery_1.default('.img-upload').on('click', function () {
                imgAction(e);
            });
        });
        jquery_1.default('.images-list').on('click', 'b', function (e) {
            var marker = jquery_1.default(".loading").attr("data-qiniu-marker");
            lstImg(marker);
        });
    };
    exports.file = file;
});
