import $ from 'jquery'

class requestController {
    text(obj: any, func: any) {
        $.ajax({
            url: obj.url,
            data: obj.data,
            method: obj.method,
            type: 'JSON',
            success: function (res) {
                //返回data数据
                func(res)
            },
            error: function () {
                console.log('error')
            }
        })
    }

    file(obj: any, func: any) {
        $.ajax({
            url: obj.url,
            data: obj.data,
            method: 'POST',
            type: 'JSON',
            processData: false,
            contentType: false,
            success: function (res) {
                //返回data数据
                func(res)
            },
            error: function () {
                console.log('error')
            }
        })
    }
}

let req = new requestController()
export {req}