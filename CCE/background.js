chrome.contextMenus.create({
    "title": "Do",
    "contexts": ["page", "selection", "image", "link"],
    "onclick": function(e){
        var url = e.pageUrl;
        if (e.selectionText) {
            url = e.selectionText;
        } else if (e.linkUrl) {
            url = e.linkUrl;
        }

        if (url) {
            let prUrlRe = /^https:\/\/github\.com\/[^\/]+\/[^\/]+\/pull\/\d+/i;
            let urlMatch = url.match(prUrlRe);
            if (urlMatch && urlMatch.length === 1) {
                url = urlMatch[0];
                let newUrl = 'codeflow:open?pullrequest=' + url + '&ref=ChromeExtension';
                // chrome.tabs.create({"url": newUrl});
                // use window.location, no new tab since this url will not populate current window
                chrome.tabs.query(
                    {currentWindow: true, active: true}, 
                    function(tab) {
                        chrome.tabs.update(tab.id, {url:newUrl});
                        // if (typeof(tab[0].url) === 'string') {
                        //     let currentPageUrl = tab[0].url;
                        //     let currentPageUrlMatch = currentPageUrl.match(prUrlRe);
                        //     if (currentPageUrlMatch && currentPageUrlMatch.length === 1) {
                        //         window.setTimeout(function() {chrome.tabs.remove(tab[0].id, function(){});}, 8000);
                        //     }
                        // }
                    }
                );

                return ;
            }

            let commitUrlRe = /^https:\/\/github\.com\/[^\/]+\/[^\/]+\/commit\/[^\/]+/i;
            let commitMatch = url.match(commitUrlRe);
            if (commitMatch && commitMatch.length === 1) {
                let newUrl = 'pythonprotocol:open?commit=' + url;
                chrome.tabs.query(
                    {currentWindow: true, active: true}, 
                    function(tab) {
                        chrome.tabs.update(tab.id, {url:newUrl});
                    }
                );
            }
        }
    }
});
