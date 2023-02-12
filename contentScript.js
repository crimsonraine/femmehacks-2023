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
            console.log("fetched, contentScript");
        });
    };

    const newItemLoaded = async () => {
        const saveButtonExists = document.getElementsByClassName("save-btn")[0];
        current_inventory = await fetch_inventory();
        if (!saveButtonExists) {
            const saveButton = document.createElement("img");

            saveButton.src = chrome.runtime.getURL("assets/plus.png");
            saveButton.className = "amazon-button " + "save-btn";
            saveButton.title = "add to list";
            amazon_feature_list = document.getElementsByClassName("a-unordered-list a-vertical a-spacing-mini")[0]; // "a-section""a-unordered-list a-vertical a-spacing-mini")[0];
            console.log(amazon_feature_list);
            amazon_title = document.getElementsByClassName("a-size-large product-title-word-break")[0];

            amazon_feature_list.appendChild(saveButton);
            saveButton.addEventListener("click", addNewItemEventHandler);
        }
    }

    const addNewItemEventHandler = async () => {
        const activeTab = window.location.href;
        const current_item = getASIN(activeTab);
        console.log("adding" + current_item);

        const newItem = {
            asin: getASIN(activeTab),
            title: amazon_title.textContent,
            desc: getFeatures(amazon_feature_list),
            link: window.location.href,
            score: 0
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

        function getFeatures(element) {
            var featureString = "";
            for (let i = 0; amazon_feature_list.getElementsByTagName('li').length - 2; i++) {
                var listEle = amazon_feature_list.getElementsByTagName('li')[i];
                if (listEle === undefined) break;
                var val = listEle.getElementsByClassName("a-list-item")[0].innerText.toString();
                console.log(val);
                featureString += " " + (val);
            }
            console.log(featureString);
            return(featureString.toLowerCase());
        }
    }

    newItemLoaded();
})();