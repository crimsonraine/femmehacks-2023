chrome.tabs.onUpdated.addListener((tabId, tab) => {
    if (tab.url && tab.url.includes("https://www.amazon.com/")) {
      const queryParameters = tab.url.split("com/")[1];
      const urlParameters = new URLSearchParams(queryParameters);
      console.log(urlParameters);
  
      chrome.tabs.sendMessage(tabId, {
        type: "NEW",
        item_desc_url: urlParameters.get("ASIN"),
      });
    }
  });

// function getItemURLName(url) {
//     var beginning = 23;
//     var ending = beginning + 1;
//     for (let i = beginning; i < tab.url.length; i++) {
//         if (tab.url.substring(i, i+1).equals("/")) {
//             ending = i;
//             break;
//         }
//     }
//     return tab.url.substring(beginning, ending);
// }
  