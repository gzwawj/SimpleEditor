/*! This is uglify test - 2019-09-15 */
var __importDefault=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};define(["require","exports","jquery","./file"],function(e,t,n,c){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),n=__importDefault(n);function i(e,c){var i,r,u=!1;c.style.left="calc(50vw - "+c.offsetWidth/2+"px)",c.style.top="200px",e.onmousedown=function(e){e=e||window.event;i=e.clientX-c.offsetLeft,r=e.clientY-c.offsetTop,u=!0},document.onmousemove=function(e){if(u){var t=(e=e||window.event).clientX-i,n=e.clientY-r,o=document.documentElement.clientWidth-c.offsetWidth,l=document.documentElement.clientHeight-c.offsetHeight;t=Math.min(o,Math.max(0,t)),n=Math.min(l,Math.max(0,n)),c.style.left=t+"px",c.style.top=n+"px"}},document.onmouseup=function(){u=!1}}var r=document.querySelector(".shade"),u=document.querySelector(".add-menu"),s=document.querySelector(".save-menu"),d=document.querySelector(".post-menu"),y=document.querySelector(".images-menu"),a=document.querySelector(".full-screen-preview-btn"),m=document.querySelector(".split-screen-preview-btn"),f=document.querySelector(".code-preview-btn"),p=document.querySelector("#edit"),v=document.querySelector("#preview"),b=document.querySelector(".effect-preview"),q=document.querySelector(".code-preview"),k=document.querySelector(".add"),S=document.querySelector(".add-move-btn"),h=document.querySelector(".save"),w=document.querySelector(".save-move-btn"),E=document.querySelector(".post"),L=document.querySelector(".post-move-btn"),_=document.querySelector(".images"),x=document.querySelector(".images-move-btn"),g=document.querySelector(".images-items"),A=document.querySelector(".move-left"),M=document.querySelector(".move-right"),D=!0;t.init=function(){function e(e,t,n){return p.style.width="",v.style.width="",e?(p.style.width=t?100:"49.9%",v.style.width=t?100:"49.9%",p.style.display=t?"none":"block",v.style.display="block",b.style.display=n?"none":"block",q.style.display=n?"block":"none"):(p.style.width="100%",v.style.width="",p.style.display="block",v.style.display="none",b.style.display=n?"block":"none",q.style.display=n?"none":"block"),!e}var t=!0,n=!0,o=!0;a.addEventListener("click",function(){t=e(t,!0,!1)}),m.addEventListener("click",function(){n=e(n,!1,!1)}),f.addEventListener("click",function(){o=e(o,!1,!0)});function l(e,t,n,o,l){return e?(k.style.display=t?"block":"none",h.style.display=n?"block":"none",E.style.display=o?"block":"none",_.style.display=l?"block":"none",r.style.display="block"):(k.style.display="none",h.style.display="none",E.style.display="none",_.style.display="none"),!e}u.addEventListener("click",function(){D=l(D,!0,!1,!1,!1),i(S,k)}),s.addEventListener("click",function(){D=l(D,!1,!0,!1,!1),i(w,h)}),d.addEventListener("click",function(){D=l(D,!1,!1,!0,!1),i(L,E)}),y.addEventListener("click",function(){D=l(D,!1,!1,!1,!0),i(x,_)}),A.addEventListener("click",function(){g.style.left="0",A.style.opacity=.1,M.style.opacity=""}),M.addEventListener("click",function(){g.style.left="-600px",A.style.opacity="",M.style.opacity=.1}),r.addEventListener("click",function(){D||(k.removeAttribute("style"),h.removeAttribute("style"),E.removeAttribute("style"),_.removeAttribute("style"),r.removeAttribute("style")),D=!D}),c.lstImg()};t.alerter=function(e){n.default(".alerter-content").text(e),n.default(".alerter").css("display","block"),n.default(".alerter").fadeOut(3e3),"已保存"==e&&(k.removeAttribute("style"),h.removeAttribute("style"),r.removeAttribute("style"),D=!D)}});