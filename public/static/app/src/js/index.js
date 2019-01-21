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
    $('#article_lst li').click(function(e){
        let id=e.target.value
        article.query(id)
    })
    /**
     * 创建文章
     */
    $('.createArticle').click(function(){
        console.log(123)
        let article_form = document.getElementById('article_form');
        article_form.reset()
        UE.getEditor('editor').setContent('');
    })
    

    module.exports = {
        init: init
    }
    /**
     * 获取点击的文章具体内容
     * @param {number} e 
     */
    let articleLiOnClick = function (e) {
        let i = 0
        while (article_data[i]) {
            if (article_data[i].id == e) {
                //调用显示文章函数
                showArticleContent(article_data[i])
                break
            }
            i++
        }
    }
    /**
     * 显示文章的具体内容
     * @param {object} object 
     */
    let showArticleContent = function (object) {

    }

    /**
     * 提交表单函数
     */
    let postData = function () {
        //获取表单数据
        let article_form = document.getElementById('article_form');
        if (article_form.title.value == "" || article_form.article.value == "") {
            alert('标题和内容不能为空！')
            return
        }
        //文章id
        let article_id = 0
        //如果表单中有文章的id表示显示的文章，没有代表新建文章
        if (article_form.id.value) {
            article_id = article_form.id.value
        } else {
            article_id = Number(getCookie('article_id')) + 1
        }
        let obj = {
            url: 'http://localhost:8899/add',
            data: {
                id: article_id,
                title: article_form.title.value,
                article: article_form.article.value
            },
            method: 'POST'
        }
        //异步t提交函数
        requestUtil(obj, addOrUpdate)
    }
    /**
     * 获取的数据对象
     * @param {object} e 
     */
    let lstData = function (e) {
        if (e.code == 200) {
            createLiData(e.data)
        }
    }
    /**
     * 添加或者更新操作返回的数据
     * @param {*} e 
     */
    let addOrUpdate = function (e) {
        if (e.code == 200) {
            alert(e.massage)
            let i = 0,
                is_add = true
            while (article_data[i]) {
                if (article_data[i].id == e.data[0].id) {
                    //更新文章内容
                    article_data[i] = e.data[0]
                    is_add = false
                    break
                }
                i++
            }
            if (is_add) {
                let article_form = document.getElementById('article_form');
                //给表单赋值文章id
                article_form.id.value = e.data[0].id
                //给数据添加数据
                article_data.push(e.data[0])
            }
            createLiData(article_data)
        }
    }


    //页面初始化调用函数
    // getData()


});