chrome.tabs.onUpdated.addListener((tabId, tab) => {
    if (tab.url && tab.url.includes("https://www.amazon.com/")) {
      const queryParameters = tab.url.split("com/")[1];
      const urlParameters = new URLSearchParams(queryParameters);
      console.log(urlParameters);
  
      chrome.tabs.sendMessage(tabId, {
        type: "NEW",
        item_desc_url: getASIN(tab.url) // urlParameters.get("ASIN"),
      });
    }
  });

function getASIN(url_asin) {
    var count = 23;
    for (let i = beginning; i < url.length - 1; i++) {
        if (url_asin.substring(i, i+3).equals("dp/")) {
            return url_asin.substring(i+3, i+ 13)
        }
    }
}
  