# LastInputDataRecovery-BrowserExtension
Browser extension to restore the last entered data in input fields even after closing the tab or browser

<h2>HOW TO INSTALL</h2>
* Download the project from GitHub in zip archive. Unzip it to a folder.
* Add the extension to a browser.</br>
** Go to chrome://extensions/.</br>
** At the top right, turn on Developer mode.</br>
** Click Load unpacked.</br>
** Find and select the extension folder.

<h2>HOW TO USE</h2>
By clicking on the extension icon you can see 2 buttons: "Restore Input Data" and "Clear Saved Input Data".</br>
"Restore Input Data" - Restore the last saved values in input fields on the current site.</br>
"Clear Saved Input Data" - Remove all the saved data from input fields.

<h2>HOW IT WORKS</h2>
Each time a user changes the value of elements input, textarea, or select then this data is saved in the extension storage chrome.storage.sync for each site separately.</br>
Warning! Working with sensitive data use "Clear Saved Input Data".
