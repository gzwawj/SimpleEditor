define(function (require, exports, module) {
    let $ = require('jquery')
    let host = 'http://localhost:8899'
    let getData = function (object, func) {
        $.ajax({
            url: host + '/' + object.fun,
            data: object.data,
            method: 'GET',
            type: 'JSON',
            success: function (res) {
                //对字符串进行转换
                func(JSON.parse(res))
            },
            error: function () {
                console.log('error')
            }
        })
    }
    let postData = function (object, func) {
        $.ajax({
            url: host + '/' + object.fun,
            data: object.data,
            method: 'POST',
            type: 'JSON',
            success: function (res) {
                //对字符串进行转换
                func(JSON.parse(res))
            },
            error: function () {
                console.log('error')
            }
        })
    }

    module.exports = {
        getData: getData,
        postData: postData
    }

});