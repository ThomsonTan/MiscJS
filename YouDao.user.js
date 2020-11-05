// ==UserScript==
// @name         YoudaoAutoWordList
// @namespace    http://Thomson.Tan/
// @version      0.1
// @description  Add selected word to Youdao wordlist automatically
// @author       Thomson
// @match http://*/*
// @match https://*/*
// @grant         GM_xmlhttpRequest
// @connect *
// @run-at document-body
// ==/UserScript==

var YouDao_username = '';
var YouDao_password = '';

function processWord(word) {
    if (typeof(word) !== "string" || word.length < 3) return null;

    word = word.trim();

    if (word.length < 3) return null;

    if (word.indexOf(' ') !== -1) return null;

    if (word.match(/^[A-Za-z][a-z]*$/) === null) return null;

    return word.toLowerCase();
}

function addWord(origWord) {
    var word = processWord(origWord);
    if (word === null) return;

    var addWordUrl = 'http://dict.youdao.com/wordbook/ajax?action=addword&q=';
    addWordUrl += encodeURIComponent(word) + '&le=eng';

    if (typeof(YouDao_username) !== 'string' ||
        typeof(YouDao_password) !== 'string' ||
        YouDao_username.length === 0 ||
        YouDao_password.length === 0) {

        alert("Please configure YouDao username and password");
        return;
    }

    GM_xmlhttpRequest({
        method: 'POST',
        url: addWordUrl,
        username: YouDao_username,
        password: YouDao_password,
    });
}

document.addEventListener('dblclick', function (e) {
    var sel = window.getSelection();
    addWord(sel.toString());
});
