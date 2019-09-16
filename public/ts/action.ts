import {idb} from "./indexedDB";
import {md} from "./md";
import {article} from "./article";
import {alerter} from "./style";
import {req} from "./request";
import $ from 'jquery'

//获取文章内容
let ftitle: any = document.querySelector('#form-title')
let fcontent: any = document.querySelector('#form-content')
let fcategory: any = document.querySelector('#form-category')
let fkeywords: any = document.querySelector('#form-keywords')

//保存文章
let article_save: any = document.querySelector('.artic-save')
let article_down: any = document.querySelector('.artic-down')
//保存状态
let sub:any=document.querySelector('.sub')
//发布文章
let article_post:any=document.querySelector('.artic-post')
let mail:any=document.querySelector('#email')
//新增文章id
let articlenum: number = 1

//预览
let effectPreview: any = document.querySelector('.effect-preview')
let codePreview: any = document.querySelector('.code-preview')

let obj: any = {
    id:articlenum,
    title: '',
    content: '',
    category: '',
    keywords: '',
    is_save: false
}
/**
 * 文章书写初始化
 * 新增文章与添加文件调用
 */
let article_init = function () {
    ftitle.setAttribute('readonly', true)
    fcontent.setAttribute('readonly', true)
    fcategory.setAttribute('readonly', true)
    fkeywords.setAttribute('readonly', true)

    setTimeout(function () {
        idb.count((e: any) => {
            articlenum = e.data.result + 1
            obj.id=articlenum
        })
        ftitle.removeAttribute('readonly')
        fcontent.removeAttribute('readonly')
        fcategory.removeAttribute('readonly')
        fkeywords.removeAttribute('readonly')

        list_article(function(e:string){
            $("#c-left ul").empty()
            $("#c-left ul").append(e)
        })
    }, 1000)

    ftitle.value = ''
    fcontent.value = ''
    fcategory.value = ''
    fkeywords.value = ''
}

let time_id: any = null
let delay_save = function (key: string, box: any) {
    if (time_id != null) {
        clearTimeout(time_id);
    }
    time_id = setTimeout(function () {
        //保存状态
        sub.style.display='block'
        obj.is_save = false
        let val = box.value
        if (val !== '') {
            obj[key] = val
            idb.add(obj, articlenum, (e: any) => {
                alerter(e.msg)
            })
        }
        if (key === 'content') {
            effectPreview.innerHTML = md(val)
            codePreview.value = md(val)
        }
    }, 1000);
}
/**
 * 编辑文章
 */
let action = function () {

    idb.connect('article')
    article_init()

    ftitle.addEventListener("keydown", function (e: any) {
        delay_save('title', ftitle)
    })
    fcontent.addEventListener("keydown", function (e: any) {
        delay_save('content', fcontent)
    })
    fcategory.addEventListener("keydown", function (e: any) {
        delay_save('category', fcategory)
    })
    fkeywords.addEventListener("keydown", function (e: any) {
        delay_save('keywords', fkeywords)
    })

    article_save.addEventListener("click", function (e: any) {
        save_article()
    })
    article_post.addEventListener("click",function(){
        post_article()
    })

    $('#c-left').on('click','a',function(e:any){
        let article_id=e.target.dataset.articleId
        idb.read(parseInt(article_id),function(res:any){
            if(res.code==2001){
                let article=res.data.result
                ftitle.value=article.title
                fcontent.value=article.content
                fcategory.value=article.category
                fkeywords.value=article.keywords

                obj.id=article.id
                obj.title=article.title
                obj.content=article.content
                obj.category=article.category
                obj.keywords=article.keywords

                articlenum=article.id
                effectPreview.innerHTML = md(article.content)
                codePreview.value = md(article.content)
            }else{
                alerter(res.msg)
            }
        })
    })
}
/**
 * 保存文章
 */
let save_article = function () {
    if (obj.title == '') {
        alerter('标题不能为空！')
    } else if (obj.content == '') {
        alerter('内容不能为空！')
    } else if (obj.category == '') {
        alerter('分类不能为空！')
    } else if (obj.keywords == '') {
        alerter('关键字不能为空！')
    } else {
        //保存状态
        sub.style.display='none'
        obj.is_save = true
        article.add(obj)
        idb.add(obj, articlenum, (e: any) => {
            alerter(e.msg)
        })
    }
}
/**
 * 发布文章
 */
let post_article=function(){
    if(!obj.is_save){
        alerter('请先保存文章！')
    }else if(mail.value==''){
        alerter('邮箱不能为空！')
    }else{
        let data={
            url:"http://static.codeinfo.top/mail/index/send",
            data:{
                author:'gzwawj.',
                title:obj.title,
                content:md(obj.content),
                email:mail.value
            },
            method:'POST'
        }
        req.text(data,(e:any)=>{
            alerter(e.msg)
        })
    }
}
let list_article=function(func:any){
    idb.lst(1,(e:any)=>{
        if(e.code=2001){
            let str:string=""
            let data=e.data.result

            for(let i in data){
                str+=`
                    <li>
                        <div class="article-item">
                            <div class="title"><a href="javascript:void(0)" data-article-id=${data[i].id}>${data[i].title}</a></div>
                            <div>分类:${data[i].category}</div>
                            <div>关键字:${data[i].keywords}</div>
                            <div>时间:</div>
                        </div>
                    </li>`
            }
            func(str)
        }else{
            alerter(e.msg)
        }
    })
}

export {action, delay_save,list_article}