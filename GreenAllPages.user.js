// ==UserScript==
// @name	Green page background
// @namespace	http://www.TianshengTan.com
// @description     This script should work for all pages without CSS. version 1.0
// @match	http://*/*
// @match https://*/*
// @run-at      document-start
// ==/UserScript==

// green current page, or insert other CSS element to DOM directly
// This is used to be done in custom.css, but it is not supported from chrome 32/33
// document-start works? I remembered it didn't work in the past

// installation guide: drag this file to chrome://extensions page directly

// document.bgColor = '#f4eed9';

var style = document.createElement('style');

style.type = 'text/css';

if (document.URL.indexOf("http://stackoverflow.com") == 0) {
    style.innerHTML = "html, body {background-color: #8ACA9A!important;} body #content{background-color: #8ACA9A!important;} body .tagged-interesting{background-color: #8ACA9A!important;}";
}
else if (document.URL.indexOf("https://vi.stackexchange.com") == 0) {
    style.innerHTML = "html, body {background-color: #8ACA9A!important;} body #content{background-color: #8ACA9A!important;} body .container{background-color: #8ACA9A!important;}";
}
else if (document.URL.indexOf("https://mail.google.com") == 0) {
    style.innerHTML = "html, body .Bu{background-color: #8ACA9A!important;line-height: 1.1em;font-size:30px;font-family: ff-tisa-web-pro,serif;} body .hP{background-color: yellow} h3{background-color: gray}";
}
else {
    style.innerHTML = "html, body {background-color: #8ACA9A!important;}";
}

document.getElementsByTagName("head")[0].appendChild( style );
