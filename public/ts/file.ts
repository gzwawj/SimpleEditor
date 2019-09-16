import {req} from "./request";
import $ from "jquery";
import {md} from "./md";
import {delay_save} from './action'
import {alerter} from "./style";
import config from "./config";

let fcontent: any = document.querySelector('#form-content')
let effectPreview: any = document.querySelector('.effect-preview')
let codePreview: any = document.querySelector('.code-preview')

/**
 * 添加文件
 * @param files
 */
let fileAction = function (files: any) {
    let formData = new FormData()
    formData.append('files', files[0], files[0].name)
    let data = {
        url: 'http://localhost:8095/server/php/index.php?fun=mdfile&db=mysql',
        data: formData
    }
    req.file(data, (e: any) => {
        let res = JSON.parse(e)

        if (res.code == 2001) {

            fcontent.value = res.data
            effectPreview.innerHTML = md(res.data)
            codePreview.value = md(res.data)
            delay_save('content', fcontent)
        }
    })
}
/**
 * 图片返回base64格式，文本返回内容
 * @param files
 * @param func
 */
let imgPreview=function(files:any,func:any){
    //实例化FileReader
    let file_reader=new FileReader()
    let file=files[0]
    if(/image+/.test(file.type)){
        file_reader.onload=function(){
            func(this.result)
        }
        file_reader.readAsDataURL(file)
    }else if(/text+/.test(file.type)){
        file_reader.onload=function(){
            func(this.result)
        }
        file_reader.readAsText(file)
    }
}
/**
 * 添加图片
 * @param files
 */
let imgAction = function (files: any) {
    let formData = new FormData()
    formData.append('host', config.qiniu.host)
    formData.append('bucket', config.qiniu.bucket)
    formData.append('type', config.qiniu.upload.type)
    formData.append('file', files[0], files[0].name)
    let data = {
        url: 'http://static.codeinfo.top/qiniu/index/index',
        data: formData
    }
    req.file(data, (e: any) => {
        let res = JSON.parse(e)
        alerter(res.msg)
    })
}
/**
 * 循环图片列表
 */
let img_arr: any = []
let forImg = function (marker: any, items: any) {
    let str: string = ''
    $('.images-list').empty()
    for (let i in img_arr) {
        str += `<li title="点击复制" data-clipboard-text="//${img_arr[i].key}"><img src="//${img_arr[i].key}"></li>`
    }
    if (marker) {
        str += `<b class="loading" data-qiniu-marker="${marker}">加载更多</b>`
    }
    $('.images-list').append(str)
}
/**
 * 请求七牛云的图片
 * @param marker_str
 * @param limit
 */
let lstImg = function (marker_str: string = '', limit: number = 3) {
    let data = {
        url: 'http://static.codeinfo.top/qiniu/index/index',
        data: {
            host: config.qiniu.host,
            bucket: config.qiniu.bucket,
            type: config.qiniu.list.type,
            prefix: 'image',
            marker: marker_str,
            limit: limit
        },
        method: "GET"
    }
    req.text(data, (e: any) => {
        let res = JSON.parse(e)
        if (res.code == 2001) {
            for (let i in res.data.items) {
                img_arr.push(res.data.items[i])
            }
            forImg(res.data.marker, img_arr)
        } else {
            alerter(res.msg)
        }
    })
}

let addFile = function (box_class: string, input_id: string, span_class: string, func: any) {
    let ffiles: any = document.querySelector(input_id)
    $(box_class).on('click', function () {
        $(input_id).trigger('click')
        $(input_id).on('change', function (e: any) {
            //添加文件名
            let url = e.target.value
            let name = url.substring(url.lastIndexOf("\\") + 1)
            if (name) {
                $(span_class).text(name)
            } else {
                $(span_class).text('选择文件')
            }
            func(ffiles.files)
        })
    })
    /**
     * 拖拽添加文件
     * 允许文件放入事件
     */
    $(box_class).on('dragover', function (e: any) {
        // 取消默认浏览器拖拽效果
        e.originalEvent.preventDefault();
        e.originalEvent.stopPropagation();
    })
    /**
     * 拖拽添加文件
     * 文件放下事件
     */
    $(box_class).on('drop', function (e: any) {
        // 取消默认浏览器拖拽效果
        e.originalEvent.preventDefault();
        e.originalEvent.stopPropagation();
        let files = e.originalEvent.dataTransfer.files;
        $(span_class).text(files[0].name)
        //文件上传方法
        func(files)
    })
}
let file = function () {
    addFile('.add-file', '#form-files', '.file-name', function (e: any) {
        fileAction(e)
    })
    addFile('.add-img', '#img-file', '.img-name', function (e: any) {
        $('.img-upload').on('click',function(){
            imgAction(e)
        })
    })
    $('.images-list').on('click', 'b', function (e) {
        let marker = $(".loading").attr("data-qiniu-marker");
        lstImg(marker)
    })
}
export {file, lstImg}
