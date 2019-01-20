define(function (require, exports, module) {
    /**
     * 创建文章，清空表单中的内容
     */
    let create = function () {
        let article_form = document.getElementById('article_form');
        article_form.id.value = ""
        article_form.title.value = ""
        UE.getEditor('editor').setContent("");
    }
    /**
     * 修改文章
     */
    let edit = function () {

    }
    /**
     * 删除文章
     */
    let del = function () {

    }
    /**
     * 查看文章
     */
    let query = function () {
        if (object.article == "") {
            alert('文章丢失了！')
        }
        let article_form = document.getElementById('article_form');
        article_form.id.value = object.id
        article_form.title.value = object.title
        //百度编辑器写入内容函数
        UE.getEditor('editor').setContent(object.article);
    }
    module.exports = {
        create: create,
        edit: edit,
        del: del,
        query: query
    }
});