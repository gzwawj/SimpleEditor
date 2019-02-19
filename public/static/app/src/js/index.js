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
        //获取data-articleid属性的值
        let id = e.target.dataset.articleid
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
    /**
     * 点击添加md文件
     */
    $('.file-add').on('click', function () {
        $('input[type="file"]').trigger('click')
        $('input[type="file"]').on('change', function (e) {
            //添加文件名
            let url = e.target.value
            let name = url.substring(url.lastIndexOf("\\") + 1)
            $('.file-add span').text(name)
        })
    })
    /**
     * 拖拽添加文件
     * 允许文件放入事件
     */
    $('.file-add').on('dragover', function (e) {
        // 取消默认浏览器拖拽效果
        e.originalEvent.preventDefault();
        e.originalEvent.stopPropagation();
    })
    /**
     * 拖拽添加文件
     * 文件放下事件
     */
    $('.file-add').on('drop', function (e) {
        // 取消默认浏览器拖拽效果
        e.originalEvent.preventDefault();
        e.originalEvent.stopPropagation();
        let files = e.originalEvent.dataTransfer.files;
        $('.file-add span').text(files[0].name)
        style.fileUpdata(files)
    })
    module.exports = {
        init: init
    }
});