document.addEventListener('DOMContentLoaded', function() {
  const captureButton = document.getElementById('capture-button');
  captureButton.addEventListener('click', function() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'captureText' });
    });
  });
});
