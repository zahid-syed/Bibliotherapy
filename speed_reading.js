// speed_reading.js

document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.local.get("selectedText", (data) => {
    const selectedText = data.selectedText;

    if (!selectedText) {
      alert("No text selected for speed reading.");
      return;
    }

    const textDisplay = document.getElementById("text-display");
    const startButton = document.getElementById("start-reading");

    const words = selectedText.split(/\s+/);
    let wordIndex = 0;
    let readingInterval;

    startButton.addEventListener("click", () => {
      if (readingInterval) {
        clearInterval(readingInterval);
        startButton.textContent = "Start Reading";
        wordIndex = 0;
        textDisplay.textContent = "";
      } else {
        startButton.textContent = "Stop Reading";
        readingInterval = setInterval(displayWord, 200);
      }
    });

    function displayWord() {
      if (wordIndex < words.length) {
        textDisplay.textContent = words[wordIndex];
        wordIndex++;
      } else {
        clearInterval(readingInterval);
        startButton.textContent = "Start Reading";
        wordIndex = 0;
      }
    }
  });
});
