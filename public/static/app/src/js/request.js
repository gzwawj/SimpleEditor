define(function (require, exports, module) {
    let $ = require('jquery')
    let cookie = require('./cookie')
    let host = ''
    let config = JSON.parse(cookie.getCookie('config'))
    if (config) {
        if (config.pro == 'php') {
            host = 'http://localhost:8111/server/php/index.php'
        } else if (config.pro == 'nodejs') {

        } else if (config.pro == 'python') {

        }
    } else {
        host = 'http://localhost:8111/server/php/index.php';
        config.db = 'mysql';
    }
    let getData = function (object, func) {
        $.ajax({
            url: host + '?fun=' + object.fun + '&db=' + config.db,
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
        if (object.fun == 'mdfile') {
            $.ajax({
                url: host + '?fun=' + object.fun + '&db=' + config.db,
                data: object.data,
                method: 'POST',
                type: 'JSON',
                processData: false,
                contentType: false,
                success: function (res) {
                    //对字符串进行转换
                    func(JSON.parse(res))
                },
                error: function () {
                    console.log('error')
                }
            })
        } else {
            $.ajax({
                url: host + '?fun=' + object.fun + '&db=' + config.db,
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
    }

    module.exports = {
        getData: getData,
        postData: postData
    }

});