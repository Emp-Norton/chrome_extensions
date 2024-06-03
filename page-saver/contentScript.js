function captureText() {
  const codeElements = document.querySelectorAll('code');
  const textArray = Array.from(codeElements).map(element => element.textContent);
  return textArray.join('\n');
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'captureText') {
    const text = captureText();
    chrome.runtime.sendMessage({ action: 'sendText', text: text });
  }
});
