define( function(require, exports,module) {

    /**
     * 创建文章列表
     */
    let datalist=function(data){
        let i = 0, str = '', arr = []
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
        return str;
    }

    module.exports={
        datalist:datalist
    }
    
});