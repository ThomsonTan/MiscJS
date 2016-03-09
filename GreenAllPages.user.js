// ==UserScript==
// @name	Green page background
// @namespace	http://www.TianshengTan.com
// @description     This script should work for all pages without CSS. version 1.0, and it also set change font for all elements.
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
var mainFont = "Open Sans";

if (document.URL.indexOf("http://stackoverflow.com") == 0) {
    style.innerHTML = "html, body {background-color: #8ACA9A!important;} body #content{background-color: #8ACA9A!important;} body .tagged-interesting{background-color: #8ACA9A!important;}";
}
else if (document.URL.indexOf("https://vi.stackexchange.com") == 0) {
    style.innerHTML = "html, body {background-color: #8ACA9A!important;} body #content{background-color: #8ACA9A!important;} body .container{background-color: #8ACA9A!important;}";
}
else if (document.URL.indexOf("https://mail.google.com") == 0) {
    style.innerHTML = "html, body .Bu{background-color: #8ACA9A!important;line-height: 1.1em;font-size:30px;font-family: verdana,serif;} body .hP{background-color: yellow} h3{background-color: gray}";
}
else if (document.URL.indexOf("https://www.evernote.com") == 0) {
    style.innerHTML = "html, body {background-color: #8ACA9A!important;} body div.GAOIOH2DIGB{background: #9ACA9A;}";
}
else if (document.URL.indexOf("https://github.com") == 0) {
    style.innerHTML = "html, body {background-color: #8ACA9A!important;} body div.comment{background-color: #8ACA9A!important}";
    mainFont = "Consolas";
}
else if (document.URL.indexOf("https://en.wikipedia.org") == 0) {
    style.innerHTML = "html, body {background-color: #8ACA9A!important;} body div.mw-content-ltr{background-color: #8ACA9A!important;} body div.toc{background-color: #8ACA9A!important;} ";
}
else if (document.URL.indexOf("https://gitter.im") == 0) {
    style.innerHTML = "html, body {background-color: #8ACA9A!important;} body div.chat-container{background-color: #8ACA9A!important;} body div.burstStart{background-color: #8ACA9A!important;} ";
}
else {
    style.innerHTML = "html, body {background-color: #8ACA9A!important;}";
}

document.getElementsByTagName("head")[0].appendChild( style );

(function() {var css = [
	"@namespace html url(http://www.w3.org/1999/xhtml);",
	"",
	"*",
	"{",
	"    font-family: \"" + mainFont + "\", \"Microsoft YaHei\", sans-serif;",
	"}",
	"",
	"h1, h2, h3, h4, h5, h6, h1 *, h2 *, h3 *, h4 *, h5 *, h6 *",
	"{",
	"    font-family: \"" + mainFont + "\", \"Roboto\", sans-serif;",
	"    text-rendering: optimizeLegibility;",
	"}",
	"",
	"h1, h1 *",
	"{",
	"    letter-spacing: -2px;",
	"}",
	"",
	"h2, h2 *",
	"{",
	"    letter-spacing: -1px;",
	"}"
].join("\n");
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof PRO_addStyle != "undefined") {
	PRO_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var node = document.createElement("style");
	node.type = "text/css";
	node.appendChild(document.createTextNode(css));
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		heads[0].appendChild(node); 
	} else {
		// no head yet, stick it whereever
		document.documentElement.appendChild(node);
	}
}
})();
