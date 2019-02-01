define(function (require, exports, module) {

    let $ = require('jquery')
    let article = require('./article')
    let style = require('./style')

    let article_data = [];
    /**
     * 页面初始化
     * 1.获取文章数据->创建文章列表
     * 2.设置默认参数参数
     */
    let init = function () {
        style.init()
        let object = {
            data: {}
        }
        article.lst()
    }
    /**
     * 查看文章
     */
    $('#article_lst').on('click', 'li', function (e) {
        let id = e.target.value
        article.query(id)
    })
    /**
     * 创建文章
     */
    $('.createArticle').click(function () {
        console.log(123)
        let article_form = document.getElementById('article_form');
        article_form.reset()
        article.removeContent()
    })
    /**
     * 保存文章
     */
    $('.saveArticle').on('click', function () {
        let article_form = document.getElementById('article_form');
        console.log(article_form);

        if (article_form.id.value) {
            //修改文章
            article.edit(article_form.id.value)
        } else {
            //创建文章
            article.create()
        }
    })
    module.exports = {
        init: init
    }
});