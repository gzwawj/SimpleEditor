import marked from "marked";
import clipboard from 'clipboard'

if (clipboard.isSupported()) {
    new clipboard('li')
}
let ajax_text = function (dom: any, url: string, data: object, method: string = "POST") {
    return dom.ajax({
        url: url,
        data: data,
        method: method,
        type: "JSON"
    })
}
let ajax_file = function (dom: any, url: string, data: object) {
    return dom.ajax({
        url: url,
        data: data,
        method: "POST",
        type: "JSON",
        processData: false,
        contentType: false,
    })
}
let article_list_html = function (data: any) {
    let str: string = ""
    for (let i in data) {
        str += `
        <li>
            <div class="article-item">
                <div class="title"><a href="javascript:void(0)" data-article-id=${data[i].id}>${data[i].title}</a></div>
                <div>分类:${data[i].categories}</div>
                <div>关键字:${data[i].keywords}</div>
                <div>时间:</div>
            </div>
        </li>
        `
    }
    return str
}
let _data = []
let images_list_html = function (data: any) {
    let str: string = ""
    for (let i in data.items) {
        _data.push(data.items[i])
    }
    for (let i in _data) {
        let url = `//pic1.rencaixiu.cn/${_data[i].key}`
        str += `<li title="点击复制" data-clipboard-text="${url}"><img src="${url}"></li>`
    }
    if (data.marker) {
        str += `<b class="loading" data-qiniu-marker="${data.marker}">加载更多</b>`
    }
    return str
}
let _time: any = null
let delay_save = function (dom: any) {
    if (_time != null) {
        clearTimeout(_time);
    }
    _time = setTimeout(function () {
        dom(".sub").css({ "display": "block" })
        let val = dom("#form-content").val()
        dom(".code-preview").val(marked(val))
        dom(".effect-preview").html(marked(val))
    }, 300);
}
let alerter = function (dom: any, msg: string) {
    dom(".alerter-content").text(msg)
    dom(".alerter").css({ "display": "block" })
    dom(".alerter").fadeOut(3000)
    dom(".add").hide()
    dom(".save").hide()
    dom(".post").hide()
    dom(".images").hide()
    dom(".shade").hide()
}
export { ajax_text, ajax_file, article_list_html, images_list_html, delay_save, alerter }