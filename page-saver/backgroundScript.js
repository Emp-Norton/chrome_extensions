chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'captureText') {
    sendTextToServer(request.text);
  }
});

function sendTextToServer(text) {
  fetch('http://your-web-server-ip:port/capture-text', {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain' },
    body: text
  })
  .then(response => response.text())
  .then(data => console.log(data))
  .catch(error => console.error(error));
}
