define(function (require, exports, module) {
    let cookie = require('./cookie')
    let request=require('./request')
    let config = {
        pro: "php",
        db: "mysql",
        edit: "ueditor",
        bg: "d0d0d0"
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
            editor(e.target.value)
        }
        if (e.target.name == 'bg') {
            config.bg = e.target.value
            $('body').css({
                "background": "#" + e.target.value
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
                //默认编辑器
                editor(this.value)
            }
            if (this.value == config.bg) {
                $('input[value=' + this.value + ']').attr("checked", "checked");
                $('body').css({
                    "background": "#" + this.value
                })
            }
        })

        $('#mdfile').change(function () {
            let data = new FormData()
            let md = document.getElementById('mdfile').files
            data.append('md', md[0], md[0].name)
            let object={
                fun:'mdfile',
                data:data
            }
            request.postData(object,function(e){
                $('#codebox').empty()
                $('#codebox').append('<pre id="marked-content">' + e + '</pre>')
                let marked_id = 'marked-content'
                //获取文本
                let content = document.getElementById(marked_id).innerText;
                //正则替换标签
                content = content.replace(/(<div>|<br>|<\/div>|\s)*(<div>|<br>|<\/div>)/g, "\n");
                //marked转换
                document.getElementById(marked_id).innerHTML = marked(content);
                //代码高亮
                $('pre code').each(function (i, block) {
                    hljs.highlightBlock(block);
                });
            })
        })
    }
    let editor = function (value) {
        $('.editbox').empty()
        if (value == 'ueditor') {
            $('.editbox').append('<script id="editor" name="content" type="text/plain"></script>')

            UE.getEditor('editor');
        }
        if (value == 'marked') {
            $('.editbox').append('<div id="editor"><textarea style="display:none;"></textarea></div>')
            $('.editbox').append('<link href="/public/editor/marked/css/editormd.min.css" rel="stylesheet">')
            let editormd = require('../../../../editor/marked/src/editormd')
            editormd("editor", {
                path: "./public/editor/marked/lib/", // Autoload modules mode, codemirror, marked... dependents libs path
                toolbarIcons: 'simple'
            });
        }
        if (value == 'md') {
            $('.editbox').append('<input id="mdfile" type="file"><div id="codebox"></div>')
            $('.editbox').append('<link href="/public/editor/md/css/monokai_sublime.min.css" rel="stylesheet">')
            $('.editbox').append('<script src="/public/editor/md/js/marked.min.js"></script>')
            $('.editbox').append('<script src="/public/editor/md/js/highlight.min.js"></script>')
        }
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
    /**
     * 使用注释的方式添加代码块
     */
    Function.prototype.getMultiLine = function () {
        var lines = new String(this);
        lines = lines.substring(lines.indexOf("/*") + 3, lines.lastIndexOf("*/"));
        return lines;
    }
    let addCode = function () {
        /* 
        js添加代码块测试，使用addCode.getMultiLine()
        */
    }
    module.exports = {
        init: init,
        datalist: datalist
    }

});