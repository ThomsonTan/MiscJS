// ==UserScript==
// @name	Change the background page of current web page to green
// @namespace	http://www.TianshengTan.com
// @description     This script should work for all pages without CSS. version 1.0
// @match	http://*/*
// @match https://*/*
// @run-at      document-end
// ==/UserScript==

// green current page, or insert other CSS element to DOM directly
// This is used to be done in custom.css, but it is not supported from chrome 32/33

// installation guide: drag this file to chrome://extensions page directly

// document.bgColor = '#f4eed9';

var style = document.createElement('style');

style.type = 'text/css';

style.innerHTML = "html, body {background-color: #8ACA9A!important;}"

document.getElementsByTagName("head")[0].appendChild( style );



