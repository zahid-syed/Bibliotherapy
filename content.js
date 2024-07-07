// content.js

function highlightSentence() {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    const sentence = range.startContainer.wholeText;
    const newNode = document.createElement("span");
    newNode.setAttribute(
      "style",
      "background-color: yellow; display: inline;"
    );
    newNode.appendChild(range.extractContents());
    range.insertNode(newNode);
  }
  
  document.addEventListener("dblclick", highlightSentence);
  