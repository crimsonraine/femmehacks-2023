// import { getActiveTabURL } from "./utils.js";

// const getASIN = () => {
//     const activeTab = getActiveTabURL();
//     const queryParameters = tab.url.split("com/")[1]; // thing after domain
//     const urlParameters = new URLSearchParams(queryParameters);
//     return urlParameters.get("ASIN");
// }

// const addNewBookmark = (itemslist, item) => {
//     const itemNameElement = document.createElement("div");
//     const controlsElement = document.createElement("div");
//     const newItemElement = document.createElement("div");

//     itemNameElement.textContent = item.name;
//     itemNameElement.className = "item-title";
//     controlsElement.className = "item-controls";

//     setItemAttributes("relocate", go, controlsElement);
//     setITemAttributes("delete", onDelete, controlsElement);

//     newItemElement.id = "item-" + item.asin;
//     newItemElement.className = "item";
//     newItemElement.setAttribute("item_identifier", item.asin);

//     newItemElement.appendChild(itemNameElement);
//     newItemElement.appendChild(controlsElement);
//     itemslist.appendChild(newItemElement);
// };

// const go = async e => {
//     location.assign('https://www.amazon.com/' + getASIN());
// };

// const onDelete = async e => {
//     const itemElementToDelete = document.getElementById(
//         "item-" + getASIN()
//     );
//     itemElementToDelete.parentNode.removeChild(itemElementToDelete);

//     chrome.tabs.sendMessage(activeTab.id, {
//         type: "DELETE",
//         value: getASIN(),
//     }, viewItems);
// };

// const setItemAttributes = (src, eventListener, controlParentElement) => {
//     const controlElement = document.createElement("img");

//     controlElement.src = "assets/" + src + ".png";
//     controlElement.title = src;
//     controlElement.addEventListener("click", eventListener);
//     controlParentElement.appendChild(controlElement);
// };

// const viewItems = (currItems = []) => {
//     const itemsElement = document.getElementById("alternatives"); // links to HTML page list
//     itemsElement.innerHTML = "";

//     if (currentItems.length > 0) {
//         for (let i = 0; i < currentItems.length; i++) {
//             const item = currentItems[i];
//             addItem(itemsElement, item);
//         }
//     } else {
//         itemsElement.innerHTML = '<i class="row">No clothing articles to show.</i>';
//     }
//     return;
// };

// document.addEventListener("DOMContentLoaded", async () => {
//     const activeTab = await getActiveTabURL();
//     const queryParameters = tab.url.split("com/")[1]; // thing after domain
//     const urlParameters = new URLSearchParams(queryParameters);
//     const currentItem = urlParameters.get("ASIN");

//     if (activeTab.url.includes("https://www.amazon.com/")) {
//         chrome.storage.sync.get([currentItem], (data) => {
//             // get saved items
//             const currItems = data[currentItem] ? JSON.parse(data[currentItem]) : [];
//             viewItems(currItems);
//         });
//     }
// });

