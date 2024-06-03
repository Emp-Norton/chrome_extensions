function captureText() {
  const codeDivs = document.querySelectorAll('.code');
  const textArray = Array.from(codeDivs).map(div => div.textContent);
  return textArray.join('\n');
}

chrome.runtime.sendMessage({ action: 'captureText', text: captureText() });
