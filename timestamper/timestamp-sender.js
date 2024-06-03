// Browser Extension
const socket = new WebSocket('ws://localhost:8765');

socket.onopen = function(event) {
    const breadcrumbText = document.querySelector('li.breadcrumb-item.active').textContent;
    const timestamp = new Date().toISOString();
    
    const message = {
        headline: breadcrumbText,
        timestamp: timestamp,
        event: "page loaded"
    };
    
    socket.send(JSON.stringify(message));
};

