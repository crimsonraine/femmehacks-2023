(() => {

    chrome.runtime.onMessage.addListener((obj, sender, response) => {
        const {type, value, item_desc_url} = obj;

        if (type === "NEW") {
            currentItem = item_desc_url;
            newItemLoaded();
        }
    })

    const newItemLoaded = () => {
        const saveButtonExists = document.getElementsByClassName("save-btn")[0];
        if (!saveButtonExists) {
            const saveButton = document.createElement("img");

            saveButton.src = chrome.runtime.getURL("assets/logo.png");
            saveButton.className = "amazon-button " + "save-btn";
            saveButton.title = "add to list";
            amazon_feature_list = document.getElementsByClassName("a-unordered-list a-vertical a-spacing-mini")[0]; // "a-section""a-unordered-list a-vertical a-spacing-mini")[0];

            amazon_feature_list.appendChild(saveButton);
            saveButton.addEventListener("click", addNewBookmarkEventHandler);
        }
    };

    newItemLoaded();
})();