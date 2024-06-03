// Assuming this is a chrome extension content script
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  console.log('page loaded')
  if (changeInfo.status === 'complete') {
    console.log('executing script')
    chrome.tabs.executeScript(tabId,{file: 'content.js'});
  }

  // Connect to WebSocket server
  console.log('opening socket')
  const socket = new WebSocket('ws://localhost:8765');

  socket.onopen = (event) => {
    console.log('Connected to WebSocket server');
  };

  // Handle messages from content script (if needed)
  socket.onmessage = (event) => {
    console.log('Received message from content script:', event.data);
  };
});

// Extract text from breadcrumb element
const breadcrumbText = document.querySelector('li.breadcrumb-item.active').textContent;
console.log(`Breadcrumbtext: ${breadcrumbText}`)
// Get current timestamp
const timestamp = new Date().toISOString();

// Send data to background script
let dataPacket = {
  type: 'pageInfo',
  data: {
    headline: breadcrumbText,
    timestamp: timestamp,
    event: "page loaded"
  }
}
console.log(`sending ${JSON.stringify(dataPacket)}`);

chrome.runtime.sendMessage(dataPacket);

class WebSocketClient {
  private url: string;
  private socket: WebSocket | null;
  private onMessageCallback: ((data: string) => void) | null;

  constructor(url: string) {
    this.url = url;
    this.socket = null;
    this.onMessageCallback = null; 
  }

  connect() {
    this.socket = new WebSocket(this.url);

    this.socket.onopen = () => {
      console.log('WebSocket connection established');
    };

    this.socket.onmessage = (event) => {
      if (this.onMessageCallback) {
        this.onMessageCallback(event.data);
      }
    };

    this.socket.onclose = () => {
      console.log('WebSocket connection closed');
    };

    this.socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  }

  onMessage(callback: (data: string) => void) {
    this.onMessageCallback = callback;
  }

  send(message: string) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(message);
    } else {
      console.error('WebSocket is not ready to send messages');
    }
  }

  close() {
    if (this.socket) {
      this.socket.close();
    }
  }
}

export default WebSocketClient;
