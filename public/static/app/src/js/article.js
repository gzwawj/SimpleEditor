define(function (require, exports, module) {
    let request = require('./request')
    let style = require('./style')
    let cookie = require('./cookie')
    /**
     * 文章列表
     */
    let lst = function () {
        let object = {
            fun: 'lst',
            data: {}
        }
        request.getData(object, function (data) {
            style.datalist(data)
        })
    }
    /**
     * 创建文章
     */
    let create = function () {
        let article_form = document.getElementById('article_form');

        let object = {
            fun: 'add',
            data: {
                title: article_form.title.value,
                categories: article_form.categories.value,
                keywords: article_form.keywords.value,
                content: getContent(article_form)
            }
        }
        request.postData(object, function (id) {
            article_form.id.value = id
        })
    }
    /**
     * 修改文章
     */
    let edit = function (id) {
        let article_form = document.getElementById('article_form');
        let object = {
            fun: 'edit',
            data: {
                id: id,
                title: article_form.title.value,
                categories: article_form.categories.value,
                keywords: article_form.keywords.value,
                content: getContent(article_form)
            }
        }
        request.postData(object, function (id) {
            if(id){
                console.log('保存成功')
                alert('保存成功')
            }
        })
    }
    /**
     * 删除文章
     */
    let del = function (id) {
        let object = {
            fun: 'del&id=' + id,
            data: {}
        }
        request.getData(object, function (res) {
            console.log(res)
        })
    }
    /**
     * 查看文章
     */
    let query = function (id) {
        console.log(id)
        let article_form = document.getElementById('article_form');
        let object = {
            fun: 'query&id=' + id,
            data: {}
        }
        request.getData(object, function (res) {
            article_form.id.value = res[0].id
            article_form.title.value = res[0].title
            article_form.categories.value = res[0].categories
            article_form.keywords.value = res[0].keywords
            //百度编辑器写入内容函数
            setContent(article_form, res[0].content);
        })
    }
    let setContent = function (article_form, data) {
        let conf = JSON.parse(cookie.getCookie('config'))
        if (conf.edit == 'ueditor') {
            UE.getEditor('editor').setContent(data);
        } else if (conf.edit == 'marked') {
            document.getElementById('editor').innerHTML = '<textarea name="editor" style="display:none;">' + data + '</textarea>'
            let editormd = require('../../../../editor/marked/src/editormd')
            editormd("editor", {
                path: "./public/editor/marked/lib/", // Autoload modules mode, codemirror, marked... dependents libs path
                toolbarIcons: 'simple'
            });
        }
    }
    let getContent = function (article_form) {
        let conf = JSON.parse(cookie.getCookie('config'))
        if (conf.edit == 'ueditor') {
            return UE.getEditor('editor').getContent()
        } else if (conf.edit == 'marked') {
            return article_form.editor.value
        }
    }
    let removeContent = function () {
        let conf = JSON.parse(cookie.getCookie('config'))
        if (conf.edit == 'ueditor') {
            UE.getEditor('editor').setContent("");
        } else if (conf.edit == 'marked') {
            console.log('marked')
        }
    }
    module.exports = {
        lst: lst,
        create: create,
        edit: edit,
        del: del,
        query: query,
        removeContent: removeContent
    }
});