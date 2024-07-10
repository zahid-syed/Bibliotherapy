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
    const speedUpButton = document.getElementById("speed-up");
    const slowDownButton = document.getElementById("slow-down");
    const moveLeftButton = document.getElementById("move-left");
    const moveRightButton = document.getElementById("move-right");

    const words = selectedText.split(/\s+/);
    let wordIndex = 0;
    let readingInterval;
    let readingSpeed = 200; // Initial speed in milliseconds
    let isReading = false; // Track reading state
    let isPaused = false; // Track pause state

    startButton.addEventListener("click", toggleReading);
    speedUpButton.addEventListener("click", speedUp);
    slowDownButton.addEventListener("click", slowDown);
    moveLeftButton.addEventListener("click", moveLeft);
    moveRightButton.addEventListener("click", moveRight);

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

    function speedUp() {
      if (readingInterval) {
        clearInterval(readingInterval);
        readingSpeed = Math.max(50, readingSpeed - 50); // Decrease interval time, minimum 50ms
        readingInterval = setInterval(displayWord, readingSpeed);
      } else {
        readingSpeed = Math.max(50, readingSpeed - 50);
      }
    }

    function slowDown() {
      if (readingInterval) {
        clearInterval(readingInterval);
        readingSpeed = readingSpeed + 50; // Increase interval time
        readingInterval = setInterval(displayWord, readingSpeed);
      } else {
        readingSpeed = readingSpeed + 50;
      }
    }

    function moveLeft() {
      if (wordIndex > 0) {
        wordIndex = Math.max(0, wordIndex - 1);
        textDisplay.textContent = words[wordIndex];
      }
    }

    function moveRight() {
      if (wordIndex < words.length - 1) {
        wordIndex = Math.min(words.length - 1, wordIndex + 1);
        textDisplay.textContent = words[wordIndex];
      }
    }

    document.addEventListener("keydown", (event) => {
      if (event.repeat) return; // Ignore repeated keydown events

      switch (event.key) {
        case "ArrowUp": // Up arrow key to speed up
          speedUp();
          break;
        case "ArrowDown": // Down arrow key to slow down
          slowDown();
          break;
        case "ArrowLeft": // Left arrow key to move backwards
          moveLeft();
          break;
        case "ArrowRight": // Right arrow key to move forwards
          moveRight();
          break;
        case " ": // Space bar to pause/play
          isPaused = !isPaused;
          break;
      }
    });
  });
});
