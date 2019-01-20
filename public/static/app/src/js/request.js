define(function (require, exports, module) {
    let $ = require('jquery')
    let host = 'http://localhost:8899'
    let lst = function (object, func) {
        $.ajax({
            url: host + '/lst',
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
    let add = function (object, func) {
        $.ajax({
            url: host + '/add',
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
        lst: lst,
        add: add
    }

});