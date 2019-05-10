define(["require", "exports", "./indexedDB", "./md", "./article", "./style", "./request"], function (require, exports, indexedDB_1, md_1, article_1, style_1, request_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    //获取文章内容
    var ftitle = document.querySelector('#form-title');
    var fcontent = document.querySelector('#form-content');
    var fcategory = document.querySelector('#form-category');
    var fkeywords = document.querySelector('#form-keywords');
    //保存文章
    var article_save = document.querySelector('.artic-save');
    var article_down = document.querySelector('.artic-down');
    //保存状态
    var sub = document.querySelector('.sub');
    //发布文章
    var article_post = document.querySelector('.artic-post');
    var mail = document.querySelector('#email');
    //新增文章id
    var articlenum = 1;
    //预览
    var effectPreview = document.querySelector('.effect-preview');
    var codePreview = document.querySelector('.code-preview');
    /**
     * 文章书写初始化
     * 新增文章与添加文件调用
     */
    var article_init = function () {
        ftitle.setAttribute('readonly', true);
        fcontent.setAttribute('readonly', true);
        fcategory.setAttribute('readonly', true);
        fkeywords.setAttribute('readonly', true);
        setTimeout(function () {
            indexedDB_1.idb.count(function (e) {
                articlenum = e.data.result + 1;
                console.log(articlenum);
            });
            ftitle.removeAttribute('readonly');
            fcontent.removeAttribute('readonly');
            fcategory.removeAttribute('readonly');
            fkeywords.removeAttribute('readonly');
            list_article();
        }, 1000);
        ftitle.value = '';
        fcontent.value = '';
        fcategory.value = '';
        fkeywords.value = '';
    };
    var obj = {
        id: articlenum,
        title: '',
        content: '',
        category: '',
        keywords: '',
        is_save: false
    };
    var time_id = null;
    var delay_save = function (key, box) {
        if (time_id != null) {
            clearTimeout(time_id);
        }
        time_id = setTimeout(function () {
            //保存状态
            sub.style.display = 'block';
            obj.is_save = false;
            var val = box.value;
            if (val !== '') {
                obj[key] = val;
                indexedDB_1.idb.add(obj, articlenum, function (e) {
                    console.log(e.msg);
                });
            }
            if (key === 'content') {
                effectPreview.innerHTML = md_1.md(val);
                codePreview.value = md_1.md(val);
            }
        }, 1000);
    };
    exports.delay_save = delay_save;
    /**
     * 编辑文章
     */
    var action = function () {
        indexedDB_1.idb.connect('article');
        article_init();
        ftitle.addEventListener("keydown", function (e) {
            delay_save('title', ftitle);
        });
        fcontent.addEventListener("keydown", function (e) {
            delay_save('content', fcontent);
        });
        fcategory.addEventListener("keydown", function (e) {
            delay_save('category', fcategory);
        });
        fkeywords.addEventListener("keydown", function (e) {
            delay_save('keywords', fkeywords);
        });
        article_save.addEventListener("click", function (e) {
            save_article();
        });
        article_post.addEventListener("click", function () {
            post_article();
        });
    };
    exports.action = action;
    /**
     * 保存文章
     */
    var save_article = function () {
        if (obj.title == '') {
            style_1.alerter('标题不能为空！');
        }
        else if (obj.content == '') {
            style_1.alerter('内容不能为空！');
        }
        else if (obj.category == '') {
            style_1.alerter('分类不能为空！');
        }
        else if (obj.keywords == '') {
            style_1.alerter('关键字不能为空！');
        }
        else {
            //保存状态
            sub.style.display = 'none';
            obj.is_save = true;
            article_1.article.add(obj);
            indexedDB_1.idb.add(obj, articlenum, function (e) {
                style_1.alerter(e.msg);
            });
        }
    };
    /**
     * 发布文章
     */
    var post_article = function () {
        if (!obj.is_save) {
            style_1.alerter('请先保存文章！');
        }
        else if (mail.value == '') {
            style_1.alerter('邮箱不能为空！');
        }
        else {
            var data = {
                url: "http://static.codeinfo.top/mail/index/send",
                data: {
                    author: 'gzwawj.',
                    title: obj.title,
                    content: md_1.md(obj.content),
                    email: mail.value
                },
                method: 'POST'
            };
            request_1.req.text(data, function (e) {
                style_1.alerter(e.msg);
            });
        }
    };
    var list_article = function () {
        indexedDB_1.idb.lst(1, function (e) {
            console.log(e);
        });
    };
});
