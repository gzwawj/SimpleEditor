define(function (require, exports, module) {
    let request=require('./request')
    let style=require('./style')
    /**
     * 文章列表
     */
    let lst=function(){
        let object={
            fun:'lst',
            data:{}
        }
        request.getData(object,function(data){
            style.datalist(data)
        })
    }
    /**
     * 创建文章，清空表单中的内容
     */
    let create = function () {
        let article_form = document.getElementById('article_form');
       
        let object={
            fun:'add',
            data:{
                title:article_form.title.value,
                categories:article_form.categories.value,
                keywords:article_form.keywords.value,
                content:UE.getEditor('editor').getContent()
            }
        }
        request.postData(object,function(id){
            article_form.id.value = id
            // article_form.title.value = ""
            // UE.getEditor('editor').setContent("");
        })
    }
    /**
     * 修改文章
     */
    let edit = function (id) {
        let object={
            fun:'edit?id='+id,
            data:{}
        }

    }
    /**
     * 删除文章
     */
    let del = function (id) {
        let object={
            fun:'del?id='+id,
            data:{}
        }
    }
    /**
     * 查看文章
     */
    let query = function (id) {
        let object={
            fun:'query?id='+id,
            data:{}
        }

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
        lst:lst,
        create: create,
        edit: edit,
        del: del,
        query: query
    }
});