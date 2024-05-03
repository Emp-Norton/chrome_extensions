/*
    const WebSocketClient = require("./GeneralWebSocket.mjs");
    const client = new WebSocketClient("ws://<address of socket>:<port>/");
*/
class WebSocketClient {
  constructor(url) {
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

  onMessage(callback) {
    this.onMessageCallback = callback;
  }

  send(message) {
    if (this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(message);
    } else {
      console.error('WebSocket is not ready to send messages');
    }
  }

  close() {
    this.socket.close();
  }
}

module.exports = WebSocketClient;
