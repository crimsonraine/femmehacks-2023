import { getActiveTabURL } from "./utils.js";

let rankings = {
    'organic hemp': 5,
    'organic linen': 5,
    'bamboo': 5,
    'recycled polyester': 5,
    'lyocell': 5,
    'tencel':5,
    'recycled cotton':5,
    'recycled wool':5,
    'organic cotton':4,
    'hemp':4,
    'linen (not organic)':4,
    'silk':4,
    'recycled polyester':3,
    'recycled nylon':3,
    'organic wool': 3,
    'alpaca': 3,
    'cotton':2,
    'rayon':2,
    'viscose ':2,
    'wool':2,
    'cashmere':2,
    'modal':2,
    'leather':2,
    'polyester':1,
    'acrylic':1,
    'nylon (not recycled)':1,
    'spandex':1
};

const addNewItem = (itemsElement, item) => {
    console.log("addNewItem in popup called");
    const itemTitleElement = document.createElement("div");
    const newItemElement = document.createElement("div");

    itemTitleElement.textContent = item.title;
    itemTitleElement.className = "items_wish-title";
    newItemElement.id = "items_wish-" + item.asin;
    newItemElement.className = "item";
    newItemElement.setAttribute("ASIN", item.asin);
    newItemElement.setAttribute("location", item.link);

    newItemElement.appendChild(itemTitleElement);
    itemsElement.appendChild(newItemElement);
};

const viewItems = (current_inventory) => {
    console.log("viewItems called");
    const itemsElement = document.getElementById("items_wish");
    itemsElement.innerHTML = "";

    if (current_inventory.length > 0) {
        for (let i = 0; i < current_inventory.length; i++) {
            const item = current_inventory[i];
            addNewItem(itemsElement, item);
        }
    } else {
        itemsElement.innerHTML = '<i class = "row">No items saved to display</i>';
    }
};

const setAddtoListAttributes =  (src, eventListener, controlParentElement) => {
    const controlElement = document.createElement("img");
  
    controlElement.src = "assets/" + src + ".png";
    controlElement.title = src;
    controlElement.addEventListener("click", eventListener);
    controlParentElement.appendChild(controlElement);
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

