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

// var defaultColor = "#68BB7D"; // 8A9ACA

// Low blue light
var defaultColor = "#50A038";
var zhihuHighContrastColor = "#68BB60";

var style = document.createElement('style');

style.type = 'text/css';

var mainFont = "Open Sans";
var cssBg = false;

function ExcludeFullStyle() {
    if (document.URL.indexOf("https://microsoft.visualstudio.com") === 0)
    {
        return true;
    }

    return false;
}

function ExcludeFont() {
    return false;
}

if (!ExcludeFullStyle()) {

if (document.URL.indexOf("https://stackoverflow.com") === 0) {
    style.innerHTML = "html, body {background-color: " + defaultColor + "!important;} body #content{background-color: " + defaultColor + "!important;} body .tagged-interesting{background-color: " + defaultColor + "!important;}";
}
else if (document.URL.indexOf("https://vi.stackexchange.com") === 0) {
    style.innerHTML = "html, body {background-color: " + defaultColor + "!important;} body #content{background-color: " + defaultColor +
        "!important;} body .container{background-color: " + defaultColor +
        "!important;}";
}
else if (document.URL.indexOf("https://mail.google.com") === 0) {
    style.innerHTML = "html, body .Bu{background-color: " + defaultColor +
        "!important;line-height: 1.2em;font-size:28px;font-family: verdana,serif;} " +
        "body .hP{background-color: yellow} h3{background-color: gray}" +
        "body .a3s{font: 28px " + mainFont + ",Microsoft YaHei, sans-serif!important;";
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
else if (document.URL.indexOf("https://zhuanlan.zhihu.com") === 0) {
    style.innerHTML = "html, body {background-color: " + defaultColor + "!important;} body div.editable{background-color: " + defaultColor + "!important;}";
    mainFont = "Consolas";
}
else if (document.URL.indexOf("https://www.zhihu.com") === 0) {
    style.innerHTML = "html, body {background-color: " + defaultColor +
        "!important;} body div.Card{background-color: " + defaultColor +
        "!important;} body div.ContentItem-actions{background-color: " +
        zhihuHighContrastColor + "!important;}" +
        " body div.PageHeader{background-color: " + zhihuHighContrastColor +
        "!important;} body .Sticky{background-color: " + zhihuHighContrastColor +
        "!important;} body div.QuestionHeader{background-color: " + zhihuHighContrastColor +
        "!important;} body div.QuestionHeader-footer{background-color: " + zhihuHighContrastColor + "!important;}";
}
else if (document.URL.indexOf("https://gitter.im") === 0) {
    style.innerHTML = "html, body {background-color: " + defaultColor + "!important;} body div.chat-container{background-color: " + defaultColor + "!important;} body div.burstStart{background-color: " + defaultColor + "!important;} ";
}
else if (document.URL.indexOf("https://microsoft.sharepoint.com") === 0) {
    style.innerHTML = "html, body {background-color: " + defaultColor + "!important;} body div.WACInteractiveView{background-color: " + defaultColor + "!important;}";
    cssBg = true;
}
else if (document.URL.indexOf("https://www.safaribooksonline.com") === 0 ||
         document.URL.indexOf("https://learning.oreilly.com/library/view") === 0) {
    style.innerHTML = "html, body {background-color: " + defaultColor
        + "!important;} body #g{color: blue!important; font-weight: normal!important} #sbo-rt-content pre{backgrond-color: "
        + defaultColor + "!important; font-weight: normal!important} div.annotator-adder{opacity:0.2} div.annotator-outer{opacity:0.2}";

    window.setTimeout(()=>{document.querySelector('.t-topbar').remove();}, 500);

    document.addEventListener('keydown', (event)=>{
        const keyName = event.key;
        if (keyName === 'a') {
            let nextLink = document.getElementsByClassName('next nav-link');
            if (nextLink && nextLink.length > 0) {
                nextLink[0].click();
            }
        }
        });
    document.addEventListener('mouseup', ()=>{
        let sel = window.getSelection();
         // don't hight single word which is for translation!
        if (sel.type === "Range" && sel.toString().trim().includes(' ')) {
            window.setTimeout(()=>{
                let hlLink = document.getElementsByClassName('add-highlight');
                if (hlLink && hlLink.length == 1) {
                    hlLink[0].children[0].click();
                    window.getSelection().empty(); // cancel selection for highlight
                }
            }, 100);
        }
    });
}
else if (window.location.href.startsWith('http://infocenter.arm.com/help/index.jsp?'))
{
    // redirect arm doc to advanced page to avoid the ugly frame
    let currURL = window.location.href;
    let newURL = currURL.replace('http://infocenter.arm.com/help/index.jsp', 'http://infocenter.arm.com/help/advanced/help.jsp');
    window.location.href = newURL;
}
else if (window.location.href.startsWith('http://infocenter.arm.com/help/advanced/help.jsp?'))
{
    let retryCount = 1000; // give 100 * 100 = 10 seconds as total load time
    +function deleteSuper(){
        let a = document.getElementsByClassName('content');
        if (a && a.length == 1 && a[0].contentDocument && a[0].contentDocument.body) {
            let b = a[0].contentDocument.body.children;
            if (b && b.length > 2) {
                let c = b[1].contentDocument;
                if (c && c.styleSheets && c.styleSheets.length > 1 && c.styleSheets[0].rules.length == 2) {
                    c.styleSheets[0].deleteRule(1);
                    retryCount = 0;
                }
            }
        }

        if (--retryCount > 0) {
            window.setTimeout(deleteSuper, 100);
        }
    }();
}
else if (document.URL.indexOf('https://weibo.com/u/3913659795') === 0) {
    let weiboInFocus = true; // no fresh at begining
    window.onblur = function(){weiboInFocus = false;};
    window.onfocus = function(){weiboInFocus = true;document.getElementsByClassName('W_input')[1].focus();};


    +function refreshWeibo(){
        window.setTimeout(refreshWeibo, 300 * 1000);
        if (!weiboInFocus){window.location.reload();};
    }();
}

if (!style.innerHTML){
    style.innerHTML = "html, body {background-color: " + defaultColor + "!important;} body #g{color: blue!important; font-weight: normal!important} body #f{color: " + defaultColor + "!important; font-weight: normal!important}";
}

// temporary code for special site
// reload with fresh URL everytime to avoid err paramater encoded in URL
// https://www.eventbrite.com/e/20181-tickets-41719562334
// test URL: https://www.eventbrite.com/e/41931888407
const REG_EVENT_URL = 'https://www.eventbrite.com/e/20181-tickets-41719562334';
if (document.URL.startsWith(REG_EVENT_URL)) {
    const RELOAD_INTERVAL = 60000; //ms

    document.addEventListener('DOMContentLoaded', function regChime(){
        if ((document.getElementsByClassName('ticket_table_select').length == 0) ||
           typeof(freeCheckout) !== 'function') {
            // no available seats to register, reload?
            // alert("No seats, will reload and check");
            window.setTimeout(function(){document.location = REG_EVENT_URL;}, RELOAD_INTERVAL);
        }
        else {
            // select option to reserve, needs customization???
            document.getElementsByClassName('ticket_table_select')[0].children[1].selected = true;

            // start to checkout
            freeCheckout();

            // alert('Register success?'); // comment out this if result page is actively monitered.

            // reload if see errors
            (function ReloadOnError(){
                var errMsg = document.getElementById('ticket_error_message');
                if (errMsg && errMsg['style'].display != 'none') {/* register error? */ document.location = REG_EVENT_URL;}
                else {window.setTimeout(ReloadOnError, RELOAD_INTERVAL);}})();

        }
    });
}
else if (document.URL.startsWith('https://www.eventbrite.com/register')) {
    document.addEventListener('DOMContentLoaded', function confirmReg(){
        if (typeof(freeCheckout) === "function") {freeCheckout();}
        else {window.setTimeout(confirmReg, 100000);}
    });
}

if(document.URL.indexOf("https://reviews.llvm.org") === 0 ||
   document.URL.indexOf("wincode") === 7 ||
   document.URL.indexOf("http://llvm.org/doxygen/") === 0 ||
   document.URL.indexOf("https://github.com/") === 0) {
    mainFont = "Consolas";
}

document.getElementsByTagName("head")[0].appendChild( style );

(function() {var css = [
	"@namespace html url(http://www.w3.org/1999/xhtml);",
	"*",
	"{",
	"    font-family: \"" + mainFont + "\", \"Microsoft YaHei\", sans-serif!important;",
    cssBg ? "background-color: " + defaultColor + "!important;" : "",
	"}",
	"",
	"h1, h2, h3, h4, h5, h6, h1 *, h2 *, h3 *, h4 *, h5 *, h6 *",
	"{",
	"    font-family: \"" + mainFont + "\", \"Roboto\", sans-serif;",
	"    text-rendering: optimizeLegibility;",
    cssBg ? "background-color: " + defaultColor + "!important;" : "",
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

if (ExcludeFont()) {
    // don't do anything
}
else if (typeof GM_addStyle != "undefined") {
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
if (document.URL.startsWith('https://microsoft.visualstudio.com/DefaultCollection/_git/os/commit')) {

    document.addEventListener('DOMContentLoaded',
        function addCFLink(){
            let titleNode = document.getElementsByClassName('inline')[0];
            if (!titleNode) {
                setTimeout(addCFLink, 300);

                return;
            }
            let titleText = titleNode.innerText;
            if (titleText && titleText.startsWith("Merged PR")) {
                let prNum = parseInt(titleText.substr(10));
                if (Number.isInteger(prNum)){
                    let newTitle = document.createElement('a');
                    let linkURL = "codeflow:open?server=https://microsoft.visualstudio.com/DefaultCollection/&project=8d47e068-03c8-4cdc-aa9b-fc6929290322&repo=7bc5fd9f-6098-479a-a87e-1533d288d438&pullRequest=" + prNum;

                    newTitle.innerText = titleText;
                    newTitle.href=linkURL;

                    titleNode.replaceWith(newTitle);
                }
            }
        }
    );
}


