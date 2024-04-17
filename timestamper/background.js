chrome.runtime.onInstalled.addListener(function() {
    // Connect to WebSocket server
    const socket = new WebSocket('ws://localhost:8765');

    socket.onopen = function(event) {
        console.log('Connected to WebSocket server');
    };

    // Handle messages from content script (if needed)
    socket.onmessage = function(event) {
        console.log('Received message from content script:', event.data);
    };
});
