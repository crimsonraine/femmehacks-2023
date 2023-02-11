import { getActiveTabURL } from "./utils.js";

document.addEventListener("DOMContentLoaded", async () => {
    const activeTab = await getActiveTabURL();
    const queryParameters = activeTab.url.split("com/")[1];
    const urlParameters = new URLSearchParams(queryParameters);

    const current_item = getASIN(activeTab.url);

    if (activeTab.url.includes("https://www.amazon.com/") && current_item) {
        chrome.storage.sync.get([current_item], (data) => {
            const currItem = data[current_item] ? JSON.parse(data[current_item]) : [];
            viewItems(currItem);
        });
    }

    function getASIN(url_asin) {
        var beginning = 23;
        for (let i = beginning; i < url_asin.length - 1; i++) {
            if (url_asin.substring(i, i + 3) === "dp/") {
                return url_asin.substring(i + 3, i + 13)
            }
        }
    }
});

