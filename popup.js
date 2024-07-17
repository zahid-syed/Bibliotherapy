document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.sync.get("dictionary", (data) => {
    const dictionary = data.dictionary || [];
    const dictionaryDiv = document.getElementById("dictionary");
    dictionaryDiv.innerHTML = dictionary.map(entry => `
      <div class="word-entry">
        <span class="word">${entry.word}</span>
        ${entry.note ? `<span class="note"> - ${entry.note}</span>` : ""}
        <button class="edit-btn" data-word="${entry.word}">Edit</button>
        <button class="delete-btn" data-word="${entry.word}">Delete</button>
        <button class="wiki-btn" data-word="${entry.word}">Wikipedia</button>
        <button class="dict-btn" data-word="${entry.word}">Dictionary</button>
      </div>
    `).join("<br>");
  });

  document.getElementById("dictionary").addEventListener("click", (event) => {
    if (event.target.classList.contains("edit-btn")) {
      const word = event.target.getAttribute("data-word");
      editWord(word);
    } else if (event.target.classList.contains("delete-btn")) {
      const word = event.target.getAttribute("data-word");
      deleteWord(word);
    } else if (event.target.classList.contains("wiki-btn")) {
      const word = event.target.getAttribute("data-word");
      searchWikipedia(word);
    } else if (event.target.classList.contains("dict-btn")) {
      const word = event.target.getAttribute("data-word");
      searchDictionary(word);
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

function deleteWord(word) {
  chrome.storage.sync.get("dictionary", (data) => {
    let dictionary = data.dictionary || [];
    dictionary = dictionary.filter(entry => entry.word !== word);
    chrome.storage.sync.set({ dictionary }, () => {
      alert(`Word "${word}" deleted.`);
      location.reload(); // Reload the popup to reflect the changes
    });
  });
}

function searchWikipedia(word) {
  const url = `https://en.wikipedia.org/wiki/${encodeURIComponent(word)}`;
  window.open(url, '_blank');
}

function searchDictionary(word) {
  const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data[0] && data[0].meanings && data[0].meanings[0].definitions) {
        alert(`Definition of ${word}: ${data[0].meanings[0].definitions[0].definition}`);
      } else {
        alert(`No definition found for ${word}`);
      }
    })
    .catch(error => {
      console.error('Error fetching definition:', error);
      alert('Error fetching definition. Please try another word');
    });
}
