# Bibliotherapy Extension

Bibliotherapy is a Chrome browser extension designed to help you read text faster and manage your vocabulary efficiently. This extension allows you to save words to a personal dictionary, edit notes, delete words, perform Wikipedia searches, and use a speed reading mode for selected text.

<img width="1429" alt="image" src="https://github.com/user-attachments/assets/7000282b-c00f-4e10-a9ad-5bfbebfacddd">


## Features
- Save words and phrases to a personal dictionary.
- Edit notes associated with saved words.
- Delete saved words from the dictionary.
- Perform quick Wikipedia searches for saved words.
- Perform dictionary searches using the Free Dictionary API.
- Speed read selected chunks of text with adjustable speed.

## Setup

### Step-by-Step Installation Guide

1. **Clone this repository:**
    ```sh
    git clone https://github.com/yourusername/bibliotherapy-extension.git
    cd bibliotherapy-extension
    ```

2. **Open Chrome and navigate to:**
    ```
    chrome://extensions/
    ```

3. **Enable Developer Mode** by clicking the toggle switch in the top right corner.

4. **Click "Load Unpacked"** and select the directory where you cloned the repository.

5. **Optional:** Pin the extension to the toolbar for quick access.

6. **Using the Extension:**
    - **Context Menu:**
        - Double-click anywhere in Chrome to open the context menu.
        - You can either save a word to the dictionary or select a chunk of text to speed read.
    - **Popup Menu:**
        - Edit notes next to your saved words.
        - Delete saved words.
        - Perform a Wikipedia search.
        - Perform a dictionary search using the Free Dictionary API.
        - Note: If searches return errors, it usually indicates a query issue.
    - **Speed Reading Mode:**
        - Use the speed reading menu to control text display.
        - **Keyboard Shortcuts:**
            - **Space**: Start/Stop reading.
            - **Up Arrow**: Speed up.
            - **Down Arrow**: Slow down.
            - **Left Arrow**: Move left (one word back).
            - **Right Arrow**: Move right (one word forward).

## Common Errors and Troubleshooting

### Common Issues:
- **Extension Not Working:** Either the speed reading mode or the popup personal dictionary might not function properly.

### Fixes:
1. **Reload the Extension:**
    - Go to `chrome://extensions/` and click the reload button for the Bibliotherapy extension.

2. **Reinstall the Extension:**
    - If reloading doesn't work, remove the extension from `chrome://extensions/`.
    - Follow the setup steps again to reload the extension.

### Additional Notes:
- Changing the `src` in `popup.js` from `styl.css` to `style.css` can improve the popup menu's appearance.

## Contributing

Contributions are welcome! Please fork this repository and submit pull requests with your improvements or fixes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For any inquiries or issues, please open an issue on GitHub.
