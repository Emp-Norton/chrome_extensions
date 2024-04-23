chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    console.log('page loaded')
    if (changeInfo.status === 'complete') {
        console.log('executing script')
        chrome.tabs.executeScript(tabId,{file: 'content.js'});
    }

    // Connect to WebSocket server
    console.log('opening socket')
    const socket = new WebSocket('ws://localhost:8765');

  socket.onopen = function(event) {
      console.log('Connected to WebSocket server');
  };

    // Handle messages from content script (if needed)
   socket.onmessage = function(event) {
     console.log('Received message from content script:', event.data);
   };
});
