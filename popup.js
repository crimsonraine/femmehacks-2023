import { getActiveTabURL } from "./utils.js";

const addNewItem = (itemsElement, item) => {
    console.log("addNewItem in popup called");
    const itemTitleElement = document.createElement("div");
    const newItemElement = document.createElement("div");

    itemTitleElement.textContent = item.title;
    itemTitleElement.className = "clothes-title";
    newItemElement.id = "clothes-" + item.asin;
    newItemElement.className = "clothes";
    newItemElement.setAttribute("ASIN", item.asin);

    newItemElement.appendChild(itemTitleElement);
    itemsElement.appendChild(newItemElement);
};

const viewItems = (current_inventory) => {
    console.log("viewItems called");
    const itemsElement = document.getElementById("clothes");
    itemsElement.innerHTML = "<h5>article of clothing</h5>"; // not working

    if (itemsElement.length > 0) {
        for (let i = 0; i < current_inventory.length; i++) {
            const item = current_inventory[i];
            addNewItem(itemsElement, item);
        }
    } else {
        itemsElement.innerHTML = '<i class = "row">No items saved to display</i>';
    }
};

document.addEventListener("DOMContentLoaded", async () => {
    const activeTab = await getActiveTabURL();
    const queryParameters = activeTab.url.split("com/")[1];
    const urlParameters = new URLSearchParams(queryParameters);

    const current_item = getASIN(activeTab.url);

    if (activeTab.url.includes("amazon.com") && current_item) {
        chrome.storage.sync.get([current_item], (data) => {
            console.log("attempt run");
            const current_inventory = data[current_item] ? JSON.parse(data[current_item]) : [];
            viewItems(current_inventory);
        });
    } else {
        const container = document.getElementsByClassName("container")[0];
        container.innerHTML = '<h2 class="message">To get started, please open an Amazon product page.</h2>';
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

