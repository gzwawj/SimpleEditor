define(function (require, exports, module) {
    let cookie = require('./cookie')
    let config = {
        pro: "php",
        db:"mysql",
        edit:"ueditor",
        bg:"d0d0d0"
    }
    $('input').click(function (e) {
        if (e.target.name == 'pro') {
            config.pro = e.target.value
        }
        if (e.target.name == 'db') {
            config.db = e.target.value
        }
        if (e.target.name == 'edit') {
            config.edit = e.target.value
        }
        if (e.target.name == 'bg') {
            config.bg = e.target.value
            $('body').css({
                "background": "#"+e.target.value
            })
        }
        cookie.setCookie('config', JSON.stringify(config))
    })
    /**
     * 设置默认设置
     * 1.默认编辑器
     * 2.默认radio选中项
     * 3.默认样式
     */
    let init = function () {
        //默认编辑器
        UE.getEditor('editor');
        let conf = JSON.parse(cookie.getCookie('config'))
        config = conf ? conf : config
        $('input[type=radio]').each(function (e) {
            if (this.value == config.pro) {
                $('input[value=' + this.value + ']').attr("checked", "checked");
            }
            if (this.value == config.db) {
                $('input[value=' + this.value + ']').attr("checked", "checked");
            }
            if (this.value == config.edit) {
                $('input[value=' + this.value + ']').attr("checked", "checked");
            }
            if (this.value == config.bg) {
                $('input[value=' + this.value + ']').attr("checked", "checked");
                $('body').css({
                    "background": "#"+this.value
                })
            }
        })
    }
    /**
     * 创建文章列表
     */
    let datalist = function (data) {
        let i = 0,
            str = '',
            arr = []
        if (data.length > 0) {
            while (data[i]) {
                arr.push(Number(data[i].id))

                str += '<li onClick="articleLiOnClick(' + data[i].id + ')" title="' + data[i].title + " | " + data[i].createtime + '">'
                str += data[i].title
                str += '</li>'
                i++
            }
        } else {
            str = '<p style="text-align: center;">-----没有文章了!-----</p>'
        }

        article_data = data
        //创建li数据列表
        document.getElementById('article_lst').innerHTML = str;
    }

    module.exports = {
        init: init,
        datalist: datalist
    }

});