define(function (require) {
    let index = require('./index')
   
    index.getData()
    //点击获取
    $('body').click(function(){
        let ue = UE.getEditor('editor');

    })

  
});