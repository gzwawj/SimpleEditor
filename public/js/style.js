var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "jquery", "./file"], function (require, exports, jquery_1, file_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    jquery_1 = __importDefault(jquery_1);
    //遮罩
    var shade = document.querySelector('.shade');
    //顶部菜单
    var add_menu = document.querySelector('.add-menu');
    var save_menu = document.querySelector('.save-menu');
    var post_menu = document.querySelector('.post-menu');
    var images_menu = document.querySelector('.images-menu');
    //全屏预览
    var fspb = document.querySelector('.full-screen-preview-btn');
    //分屏预览
    var sspb = document.querySelector('.split-screen-preview-btn');
    //代码预览
    var cpb = document.querySelector('.code-preview-btn');
    //edit编辑区
    var edit = document.querySelector('#edit');
    //preview预览区
    var preview = document.querySelector('#preview');
    var effectPreview = document.querySelector('.effect-preview');
    var codePreview = document.querySelector('.code-preview');
    //可移动的菜单
    var add = document.querySelector('.add');
    var add_move_btn = document.querySelector('.add-move-btn');
    var save = document.querySelector('.save');
    var save_move_btn = document.querySelector('.save-move-btn');
    var post = document.querySelector('.post');
    var post_move_btn = document.querySelector('.post-move-btn');
    var images = document.querySelector('.images');
    var images_move_btn = document.querySelector('.images-move-btn');
    var images_items = document.querySelector('.images-items');
    var move_left = document.querySelector('.move-left');
    var move_right = document.querySelector('.move-right');
    var menu_is_show = true;
    var move = function (move_btn, move_box) {
        var x, y, is_move = false;
        move_box.style.left = "calc(50vw - " + (move_box.offsetWidth / 2) + "px)";
        move_box.style.top = "200px";
        move_btn.onmousedown = function (e) {
            var e = e || window.event; //要用event这个对象来获取鼠标的位置
            x = e.clientX - move_box.offsetLeft;
            y = e.clientY - move_box.offsetTop;
            is_move = true; //设为true表示可以移动
        };
        document.onmousemove = function (e) {
            //是否为可移动状态                　　　　　　　　　　　 　　　　　　　
            if (is_move) {
                var e = e || window.event;
                var moveX = e.clientX - x; //得到距离左边距离                    　　
                var moveY = e.clientY - y; //得到距离上边距离
                var maxX = document.documentElement.clientWidth - move_box.offsetWidth;
                var maxY = document.documentElement.clientHeight - move_box.offsetHeight;
                //范围限定  当移动的距离最小时取最大  移动的距离最大时取最小
                //范围限定一
                /*if(moveX < 0) {
                    moveX = 0
                } else if(moveX > maxX) {
                    moveX = maxX;
                }
    
                if(moveY < 0) {
                    moveY = 0;
                } else if(moveY > maxY) {
                    moveY = maxY;
                }　*/
                //范围限定二　
                moveX = Math.min(maxX, Math.max(0, moveX));
                moveY = Math.min(maxY, Math.max(0, moveY));
                move_box.style.left = moveX + "px";
                move_box.style.top = moveY + "px";
            }
            else {
                return;
            }
        };
        document.onmouseup = function () {
            is_move = false; //设置为false不可移动
        };
    };
    var init = function () {
        var is_full = true, is_split = true, is_code = true;
        var pre = function (status, is_fulls, is_codes) {
            edit.style.width = '';
            preview.style.width = '';
            if (status) {
                edit.style.width = is_fulls ? 100 : 49.9 + "%";
                preview.style.width = is_fulls ? 100 : 49.9 + "%";
                edit.style.display = is_fulls ? 'none' : 'block';
                preview.style.display = 'block';
                effectPreview.style.display = is_codes ? 'none' : 'block';
                codePreview.style.display = is_codes ? 'block' : 'none';
            }
            else {
                edit.style.width = 100 + "%";
                preview.style.width = '';
                edit.style.display = 'block';
                preview.style.display = 'none';
                effectPreview.style.display = is_codes ? 'block' : 'none';
                codePreview.style.display = is_codes ? 'none' : 'block';
            }
            // status =! status
            return !status;
        };
        fspb.addEventListener('click', function () {
            is_full = pre(is_full, true, false);
            // if(is_full){
            //     edit.style.display='none'
            //     preview.style.width=100+'%'
            //     preview.style.display='block'
            //     effectPreview.style.display='block'
            //     codePreview.style.display="none"
            // }else{
            //     edit.style.width=100+'%'
            //     edit.style.display='block'
            //     preview.style.display='none'
            //     effectPreview.style.display='none'
            //     codePreview.style.display="block"
            // }
            // is_full =! is_full
        });
        sspb.addEventListener('click', function () {
            is_split = pre(is_split, false, false);
            // if(is_split){
            //     edit.style.display="block"
            //     edit.style.width=49.9+"%"
            //     preview.style.width=49.9+"%"
            //     preview.style.display="block"
            //     effectPreview.style.display='block'
            //     codePreview.style.display="none"
            // }else{
            //     edit.style.display="block"
            //     edit.style.width=100+"%"
            //     preview.style.display="none"
            //     effectPreview.style.display='none'
            //     codePreview.style.display="block"
            // }
            // is_split =! is_split
        });
        cpb.addEventListener('click', function () {
            is_code = pre(is_code, false, true);
            // if(is_code){
            //     edit.style.display="block"
            //     edit.style.width=49.9+"%"
            //     preview.style.width=49.9+"%"
            //     preview.style.display="block"
            //     effectPreview.style.display='none'
            //     codePreview.style.display="block"
            // }else{
            //     edit.style.display="block"
            //     edit.style.width=100+"%"
            //     preview.style.display="none"
            //     effectPreview.style.display='block'
            //     codePreview.style.display="none"
            // }
            // is_code =! is_code
        });
        var menu_sty = function (status, is_add, is_save, is_post, is_images) {
            if (status) {
                add.style.display = is_add ? 'block' : 'none';
                save.style.display = is_save ? 'block' : 'none';
                post.style.display = is_post ? 'block' : 'none';
                images.style.display = is_images ? 'block' : 'none';
                shade.style.display = 'block';
            }
            else {
                add.style.display = 'none';
                save.style.display = 'none';
                post.style.display = 'none';
                images.style.display = 'none';
            }
            return !status;
        };
        add_menu.addEventListener('click', function () {
            // if (menu_is_show) {
            //     add.style.display = 'block'
            //     shade.style.display = 'block'
            //     save.style.display = 'none'
            //
            // } else {
            //     add.style.display = 'none'
            //     save.style.display = 'none'
            // }
            // menu_is_show = !menu_is_show
            menu_is_show = menu_sty(menu_is_show, true, false, false, false);
            move(add_move_btn, add);
        });
        save_menu.addEventListener('click', function () {
            // if (menu_is_show) {
            //     add.style.display = 'none'
            //     save.style.display = 'block'
            //     shade.style.display = 'block'
            // } else {
            //     add.style.display = 'none'
            //     save.style.display = 'none'
            // }
            // menu_is_show = !menu_is_show
            menu_is_show = menu_sty(menu_is_show, false, true, false, false);
            move(save_move_btn, save);
        });
        post_menu.addEventListener('click', function () {
            // if (menu_is_show) {
            //     add.style.display = 'none'
            //     save.style.display = 'block'
            //     shade.style.display = 'block'
            // } else {
            //     add.style.display = 'none'
            //     save.style.display = 'none'
            // }
            // menu_is_show = !menu_is_show
            menu_is_show = menu_sty(menu_is_show, false, false, true, false);
            move(post_move_btn, post);
        });
        images_menu.addEventListener('click', function () {
            menu_is_show = menu_sty(menu_is_show, false, false, false, true);
            move(images_move_btn, images);
        });
        move_left.addEventListener('click', function () {
            images_items.style.left = '0';
            move_left.style.opacity = 0.1;
            move_right.style.opacity = '';
        });
        move_right.addEventListener('click', function () {
            images_items.style.left = '-600px';
            move_left.style.opacity = '';
            move_right.style.opacity = 0.1;
        });
        shade.addEventListener('click', function () {
            if (!menu_is_show) {
                add.removeAttribute('style');
                save.removeAttribute('style');
                post.removeAttribute('style');
                images.removeAttribute('style');
                shade.removeAttribute('style');
            }
            menu_is_show = !menu_is_show;
        });
        //加载图片
        file_1.lstImg();
    };
    exports.init = init;
    var alerter = function (msg) {
        jquery_1.default('.alerter-content').text(msg);
        jquery_1.default('.alerter').css('display', 'block');
        jquery_1.default('.alerter').fadeOut(3000);
        if (msg == '已保存') {
            add.removeAttribute('style');
            save.removeAttribute('style');
            shade.removeAttribute('style');
            menu_is_show = !menu_is_show;
        }
    };
    exports.alerter = alerter;
});
