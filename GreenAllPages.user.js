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

var defaultColor = "#68BB7D"; // 8A9ACA

var style = document.createElement('style');

style.type = 'text/css';

var mainFont = "Open Sans";
var cssBg = false;

function ExcludeStyle() {
    if (document.URL.indexOf("https://microsoft.visualstudio.com") === 0)
    {
        return true;
    }

    return false;
}

if (!ExcludeStyle()) {

if (document.URL.indexOf("http://stackoverflow.com") === 0) {
    style.innerHTML = "html, body {background-color: " + defaultColor + "!important;} body #content{background-color: " + defaultColor + "!important;} body .tagged-interesting{background-color: " + defaultColor + "!important;}";
}
else if (document.URL.indexOf("https://vi.stackexchange.com") === 0) {
    style.innerHTML = "html, body {background-color: " + defaultColor + "!important;} body #content{background-color: " + defaultColor + "!important;} body .container{background-color: " + defaultColor + "!important;}";
}
else if (document.URL.indexOf("https://mail.google.com") === 0) {
    style.innerHTML = "html, body .Bu{background-color: " + defaultColor + "!important;line-height: 1.1em;font-size:30px;font-family: verdana,serif;} body .hP{background-color: yellow} h3{background-color: gray}";
}
else if (document.URL.indexOf("https://www.evernote.com") === 0) {
    style.innerHTML = "html, body {background-color: " + defaultColor + "!important;} body div.GAOIOH2DIGB{background: #9ACA9A;}";
}
else if (document.URL.indexOf("https://github.com") === 0) {
    style.innerHTML = "html, body {background-color: " + defaultColor + "!important;} body div.comment{background-color: " + defaultColor + "!important}";
    // mainFont = "Consolas";
}
else if (document.URL.indexOf("https://en.wikipedia.org") === 0 || document.URL.indexOf("https://simple.wikipedia.org") === 0) {
    style.innerHTML = "html, body {background-color: " + defaultColor + "!important;} body div.mw-content-ltr{background-color: " + defaultColor + "!important;} body div.toc{background-color: " + defaultColor + "!important;} ";
}
else if (document.URL.indexOf("http://zhuanlan.zhihu.com") === 0) {
    style.innerHTML = "html, body {background-color: " + defaultColor + "!important;} body div.editable{background-color: " + defaultColor + "!important;}";
}
else if (document.URL.indexOf("https://www.zhihu.com") === 0) {
    style.innerHTML = "html, body {background-color: " + defaultColor + "!important;} body div.Card{background-color: " + defaultColor + "!important;} body div.ContentItem-actions{background-color: #7ABA8A!important;}" +
        " body div.PageHeader{background-color: #7ABA8A!important;} body .Sticky{background-color: #7ABA8A!important;} body div.QuestionHeader{background-color: #7ABA8A!important;} body div.QuestionHeader-footer{background-color: #82C292!important;}";
}
else if (document.URL.indexOf("https://gitter.im") === 0) {
    style.innerHTML = "html, body {background-color: " + defaultColor + "!important;} body div.chat-container{background-color: " + defaultColor + "!important;} body div.burstStart{background-color: " + defaultColor + "!important;} ";
}
else if (document.URL.indexOf("https://microsoft.sharepoint.com") === 0) {
    style.innerHTML = "html, body {background-color: " + defaultColor + "!important;} body div.WACInteractiveView{background-color: " + defaultColor + "!important;}";
    cssBg = true;
}
else {
    style.innerHTML = "html, body {background-color: " + defaultColor + "!important;} body #g{color: blue!important; font-weight: normal!important} body #f{color: #f92672!important; font-weight: normal!important}";
}

if(document.URL.indexOf("https://reviews.llvm.org") === 0) {
    mainFont = "Consolas";
}

if (document.URL.indexOf("wincode") === 7) {
    mainFont = "Consolas";
}

document.getElementsByTagName("head")[0].appendChild( style );

(function() {var css = [
	"@namespace html url(http://www.w3.org/1999/xhtml);",
	"*",
	"{",
	"    font-family: \"" + mainFont + "\", \"Microsoft YaHei\", sans-serif;",
    cssBg ? "background-color: #8ACA9A!important;" : "",
	"}",
	"",
	"h1, h2, h3, h4, h5, h6, h1 *, h2 *, h3 *, h4 *, h5 *, h6 *",
	"{",
	"    font-family: \"" + mainFont + "\", \"Roboto\", sans-serif;",
	"    text-rendering: optimizeLegibility;",
    cssBg ? "background-color: #8ACA9A!important;" : "",
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

}
