
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "saveWord",
    title: "Save word to dictionary",
    contexts: ["selection"]
  });

  chrome.contextMenus.create({
    id: "speedRead",
    title: "Open in Speed Reading Mode",
    contexts: ["selection"]
  });

  chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "saveWord") {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: saveWord,
        args: [info.selectionText]
      });
    } else if (info.menuItemId === "speedRead") {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: openSpeedReadingMode,
        args: [info.selectionText]
      });
    }
  });
});

function saveWord(selectedText) {
  chrome.storage.sync.get("dictionary", (data) => {
    let dictionary = data.dictionary || [];
    dictionary.push({ word: selectedText, note: "" });
    chrome.storage.sync.set({ dictionary });
  });
}

function openSpeedReadingMode(selectedText) {
  chrome.storage.local.set({ selectedText: selectedText }, () => {
    console.log("Opened spreeder window");
    window.open(chrome.runtime.getURL("speed_reading.html"));
  });
}
