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
    let readingSpeed = 200; // Initial speed in milliseconds
    let isReading = false; // Track reading state
    let isPaused = false; // Track pause state

    startButton.addEventListener("click", toggleReading);

    function toggleReading() {
      if (readingInterval) {
        clearInterval(readingInterval);
        readingInterval = null;
        startButton.textContent = "Start Reading";
        isReading = false;
      } else {
        if (wordIndex >= words.length) {
          wordIndex = 0; // Reset word index if it has reached the end
        }
        startButton.textContent = "Stop Reading";
        readingInterval = setInterval(displayWord, readingSpeed);
        isReading = true;
      }
    }

    function displayWord() {
      if (wordIndex < words.length) {
        textDisplay.textContent = words[wordIndex];
        wordIndex++;
      } else {
        clearInterval(readingInterval);
        startButton.textContent = "Start Reading";
        wordIndex = 0;
        isReading = false;
      }
    }

    document.addEventListener("keydown", (event) => {
      if (event.repeat) return; // Ignore repeated keydown events

      switch (event.key) {
        case "ArrowUp": // Up arrow key to speed up
          if (readingInterval) {
            clearInterval(readingInterval);
            readingSpeed = Math.max(50, readingSpeed - 50); // Decrease interval time, minimum 50ms
            readingInterval = setInterval(displayWord, readingSpeed);
          } else {
            readingSpeed = Math.max(50, readingSpeed - 50);
          }
          break;
        case "ArrowDown": // Down arrow key to slow down
          if (readingInterval) {
            clearInterval(readingInterval);
            readingSpeed = readingSpeed + 50; // Increase interval time
            readingInterval = setInterval(displayWord, readingSpeed);
          } else {
            readingSpeed = readingSpeed + 50;
          }
          break;
        case "ArrowLeft": // Left arrow key to move backwards
          if (wordIndex > 0) {
            wordIndex = Math.max(0, wordIndex - 1);
            textDisplay.textContent = words[wordIndex];
          }
          break;
        case "ArrowRight": // Right arrow key to move forwards
          if (wordIndex < words.length - 1) {
            wordIndex = Math.min(words.length - 1, wordIndex + 1);
            textDisplay.textContent = words[wordIndex];
          }
          break;
        case " ": // Space bar to pause/play
          isPaused = !isPaused;
          break;
      }
    });

    function displayWord() {
      if (isPaused) return; // Do not proceed if paused

      if (wordIndex < words.length) {
        textDisplay.textContent = words[wordIndex];
        wordIndex++;
      } else {
        clearInterval(readingInterval);
        startButton.textContent = "Start Reading";
        wordIndex = 0;
        isReading = false;
      }
    }

    function loop() {
      if (!isPaused && isReading) {
        displayWord();
      }
      setTimeout(loop, readingSpeed); // Loop with the specified reading speed
    }

    loop(); // Start the loop
  });
});