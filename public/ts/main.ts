declare function define(...args: any[]): any;
import $ from 'jquery'

import { ajax_text, ajax_file, article_list_html, images_list_html, delay_save, alerter } from './action'

$(".add-menu").on("click", function () {
    $(".add").toggle()
    $(".shade").show()
})
$(".save-menu").on("click", function () {
    $(".save").toggle()
    $(".shade").show()
})
$(".post-menu").on("click", function () {
    $(".post").toggle()
    $(".shade").show()
})
$(".images-menu").on("click", function () {
    $(".images").toggle()
    $(".shade").show()
})
$(".shade").on("click", function () {
    $(".add").hide()
    $(".save").hide()
    $(".post").hide()
    $(".images").hide()
    $(".shade").hide()
})
$(function () {
    //获取文章
    ajax_text($, "http://localhost:3000/article", {}, "GET").then(
        data => {
            if (data.code == 2001) {
                let str = article_list_html(data.data)
                $(".article-list").append(str)
            }
            alerter($, data.msg)
        }
    )
    //获取图片
    ajax_text($, `http://localhost:3000/qiniu`, {}).then(
        data => {
            if (data.code == 2001) {
                $('.images-list').empty()
                let str = images_list_html(data.data)
                $('.images-list').append(str)
            }
        }
    )
})
$(".article-list").on("click", "a", function (e) {
    let _id = e.target.dataset.articleId
    ajax_text($, `http://localhost:3000/article/${_id}`, {}, "GET").then(
        data => {
            if (data.code == 2001) {
                $("#form-id").val(data.data.id)
                $("#form-title").val(data.data.title)
                $("#form-content").val(data.data.content)
                $("#form-categories").val(data.data.categories)
                $("#form-keywords").val(data.data.keywords)
                delay_save($)
            }
            alerter($, data.msg)
        }
    )
})
//添加文件
$(".add-file").on("click", function () {
    $("#form-files").trigger("click")
    $("#form-files").on("change", function (e: any) {
        let name = e.target.value.substring(e.target.value.lastIndexOf("\\") + 1)
        $(".file-name").text(name ? name : "选择文件")
        // 提交文件
    })
})
//保存文章
$(".artic-save").on("click", function () {
    let url = "", id = $("#form-id").val(), title = $("#form-title").val(), content = $("#form-content").val(), categories = $("#form-categories").val(), keywords = $("#form-keywords").val();
    let obj = {
        title: title,
        content: content,
        categories: categories,
        keywords: keywords,
    }
    //提交文章
    if (id) {
        url = `http://localhost:3000/article/editor/${id}`
    } else {
        url = `http://localhost:3000/article/create`
    }
    ajax_text($, url, obj).then(
        data => {
            if (data.code == 2001) {
                alerter($, data.msg)
            }
        }
    )
})
//下载文件
$(".artic-down").on("click", function () {
    console.log("下载文件")
})
//发布文章
$(".artic-post").on("click", function () {
    let email = $("#email").val(), title = $("#form-title").val(), content = $("#form-content").val()
    // 发布文章
    if (email === "" || title === "" || content === "") {
        alerter($, "邮箱地址、标题、内容不能为空")
    } else {
        ajax_text($, `http://localhost:3000/email`, {
            email: email,
            title: title,
            content: content
        }).then(
            data => {
                if (data.code == 2001) {
                    alerter($, data.msg)
                }
            }
        )
    }
})
//添加图片
$(".add-img").on("click", function () {
    $("#img-file").trigger("click")
    $("#img-file").on("change", function (e: any) {
        let name = e.target.value.substring(e.target.value.lastIndexOf("\\") + 1)
        $(".img-name").text(name ? name : "选择文件")
    })
})
$(".img-upload").on("click", function () {
    let file: any = document.querySelector("#img-file")
    let formData = new FormData()
    formData.append("qiniufile", file.files[0])
    ajax_file($, `http://localhost:3000/qiniu/addfile`, formData).then(
        data => {
            if (data.code == 2001) {
                alerter($, data.msg)
            }
        }
    )
})
$(".move-left").on("click", function () {
    $(".images-items").css({ "left": "0" })
})
$(".move-right").on("click", function () {
    $(".images-items").css({ "left": "-600px" })
})
$(".images-list").on("click", ".loading", function (e) {
    let marker = e.target.dataset.qiniuMarker
    ajax_text($, `http://localhost:3000/qiniu`, { marker: marker }).then(
        data => {
            if (data.code == 2001) {
                $('.images-list').empty()
                let str = images_list_html(data.data)
                $('.images-list').append(str)
            }
        }
    )
})
//编辑文章
$("#form-content").bind("keyup", function () {
    delay_save($)
})
//全屏预览
let _full = true
$(".full-screen-preview-btn").on("click", function () {
    if (_full) {
        $("#edit").css({ "width": "0%", "display": "none" })
        $("#preview").css({ "width": "100%", "display": "block" })
        $(".effect-preview").css({ "display": "block" })
        $(".code-preview").css({ "display": "none" })
        _full = !_full
    } else {
        $("#edit").css({ "width": "100%", "display": "block" })
        $("#preview").css({ "width": "0%", "display": "none" })
        $(".effect-preview").css({ "display": "block" })
        $(".code-preview").css({ "display": "none" })
        _full = !_full
    }
})
// 分屏显示
let _split = true
$(".split-screen-preview-btn").on("click", function () {
    if (_split) {
        $("#edit").css({ "width": "49.9%", "display": "block" })
        $("#preview").css({ "width": "49.9%", "display": "block" })
        $(".effect-preview").css({ "display": "block" })
        $(".code-preview").css({ "display": "none" })
        _split = !_split
    } else {
        $("#edit").css({ "width": "100%", "display": "block" })
        $("#preview").css({ "width": "0%", "display": "none" })
        $(".effect-preview").css({ "display": "block" })
        $(".code-preview").css({ "display": "none" })
        _split = !_split
    }
})
// 代码显示
let _code = true
$(".code-preview-btn").on("click", function () {
    if (_code) {
        $("#edit").css({ "width": "49.9%", "display": "block" })
        $("#preview").css({ "width": "49.9%", "display": "block" })
        $(".effect-preview").css({ "display": "none" })
        $(".code-preview").css({ "display": "block" })
        _code = !_code
    } else {
        $("#edit").css({ "width": "49.9%", "display": "block" })
        $("#preview").css({ "width": "49.9%", "display": "block" })
        $(".effect-preview").css({ "display": "block" })
        $(".code-preview").css({ "display": "none" })
        _code = !_code
    }
})