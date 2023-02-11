(() => {
    let amazon_feature_list;
    let current_item = "";
    let amazon_title = "";
    let current_inventory = [];

    chrome.runtime.onMessage.addListener((obj, sender, response) => {
        const { type, value, item_desc_url } = obj;
        console.log('running');
        if (type === "NEW") {
            current_item = item_desc_url;
            newItemLoaded();
        }
    })

    const fetch_inventory = () => {
        return new Promise((resolve) => {
            chrome.storage.sync.get([current_item], (obj) => {
                resolve(obj[current_item] ? JSON.parse(obj[current_item]) : []);
            });
        });
    };

    const newItemLoaded = async () => {
        const saveButtonExists = document.getElementsByClassName("save-btn")[0];
        current_inventory = await fetch_inventory();
        if (!saveButtonExists) {
            const saveButton = document.createElement("img");

            saveButton.src = chrome.runtime.getURL("assets/logo.png");
            saveButton.className = "amazon-button " + "save-btn";
            saveButton.title = "add to list";
            amazon_feature_list = document.getElementsByClassName("a-unordered-list a-vertical a-spacing-mini")[0]; // "a-section""a-unordered-list a-vertical a-spacing-mini")[0];
            amazon_title = document.getElementsByClassName("a-size-large product-title-word-break")[0];

            amazon_feature_list.appendChild(saveButton);
            saveButton.addEventListener("click", addNewItemEventHandler);
        }
    }

    const addNewItemEventHandler = async () => {
        const activeTab = window.location.href;
        const queryParameters = activeTab.split("com/")[1];
        const urlParameters = new URLSearchParams(queryParameters);

        const current_item = getASIN(activeTab);

        const newItem = {
            asin: getASIN(activeTab),
            title: amazon_title.textContent,
            desc: 'NA'
        }
        current_inventory = await fetch_inventory();
        console.log(newItem);
        chrome.storage.sync.set({
            [current_item]: JSON.stringify([...current_inventory, newItem])
        });

        function getASIN(url_asin) {
            var beginning = 23;
            for (let i = beginning; i < url_asin.length - 1; i++) {
                if (url_asin.substring(i, i + 3)==="dp/") {
                    return url_asin.substring(i + 3, i + 13)
                }
            }
        }
    }

    newItemLoaded();
})();