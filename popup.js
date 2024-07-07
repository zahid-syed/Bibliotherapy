// popup.js

document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.sync.get("dictionary", (data) => {
    const dictionary = data.dictionary || [];
    const dictionaryDiv = document.getElementById("dictionary");
    dictionaryDiv.innerHTML = dictionary.map(entry => `
      <div class="word-entry">
        <span class="word">${entry.word}</span>
        ${entry.note ? `<span class="note"> - ${entry.note}</span>` : ""}
        <button class="edit-btn" data-word="${entry.word}">Edit</button>
      </div>
    `).join("<br>");
  });

  document.getElementById("dictionary").addEventListener("click", (event) => {
    if (event.target.classList.contains("edit-btn")) {
      const word = event.target.getAttribute("data-word");
      editWord(word);
    }
  });
});

function editWord(word) {
  const newNote = prompt(`Add a note for "${word}":`);
  if (newNote !== null) {  // Check if the user clicked "Cancel"
    chrome.storage.sync.get("dictionary", (data) => {
      let dictionary = data.dictionary || [];
      dictionary = dictionary.map(entry => entry.word === word ? { ...entry, note: newNote } : entry);
      chrome.storage.sync.set({ dictionary }, () => {
        alert(`Note added for "${word}": ${newNote}`);
        location.reload(); // Reload the popup to reflect the changes
      });
    });
  }
}
