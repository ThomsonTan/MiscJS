chrome.contextMenus.create({
    "title": "Do",
    "contexts": ["page", "selection", "image", "link"],
    "onclick": function(e){
        var url = e.pageUrl;
        if (e.selectionText) {
            
        }
        if (e.linkUrl && e.linkUrl.startsWith('https://github.com/') && e.linkUrl.indexOf('pull') != -1) {
            var newUrl = 'codeflow:open?pullrequest=' + e.linkUrl + '&ref=ChromeExtension';
            // chrome.tabs.create({"url": newUrl});
            // use window.location, no new tab since this url will not populate current window
            chrome.tabs.query(
                {currentWindow: true, active: true}, 
                function(tab) {
                    chrome.tabs.update(tab.id, {url:newUrl});
                }
            );
        }
    }
});
