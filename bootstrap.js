// when the extension is first installed
chrome.runtime.onInstalled.addListener(function(details) {
    chrome.storage.sync.set({clean_news_feed: true});
    chrome.storage.sync.set({slide: "50"});
    chrome.storage.sync.set({a: true});
    chrome.storage.sync.set({b: true});
    chrome.storage.sync.set({c: true});
    chrome.storage.sync.set({d: true});
    chrome.storage.sync.set({e: true});
    chrome.storage.sync.set({f: true});
});

// listen for any changes to the URL of any tab.
chrome.tabs.onUpdated.addListener(function(id, info, tab){
    if (tab.url.toLowerCase().indexOf("twitter.com") > -1){
        chrome.pageAction.show(tab.id);
    }
    else if (tab.url.toLowerCase().indexOf("facebook.com") > -1){
        chrome.pageAction.show(tab.id);
    } 
});
// It turns out that getManifest() returns undefined when the runtime has been
// reload through chrome.runtime.reload() or after an update.
function isValidChromeRuntime() {
    // It turns out that chrome.runtime.getManifest() returns undefined when the
    // runtime has been reloaded.
    // Note: If this detection method ever fails, try to send a message using
    // chrome.runtime.sendMessage. It will throw an error upon failure.
    return chrome.runtime && !!chrome.runtime.getManifest();
}

// E.g.
if (isValidChromeRuntime()) {
    chrome.runtime.sendMessage("asdasd");
} else {
    // Fall back to contentscript-only behavior
}

// update the icon when the user's settings change
// chrome.storage.onChanged.addListener(function(changes, areaName){
//     alert("changed settings");
//     console.log("changed settings");
//     if (localStorage["clean_news_feed"] == "true"){
//         path = "active-icon.jpeg";
//     } else {
//         path = "inactive-icon.jpeg";
//     }
//     chrome.tabs.getCurrent( function(tab){
//         chrome.pageAction.setIcon({
//             "tabId": tab.id,
//             "path": path
//         });
//     });
// });
