import { openAiApiKey } from './config.js';
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'sendText') {
    getKeywordsFromOpenAI(request.text)
      .then(keywords => sendTextToServer(request.text, keywords))
      .catch(error => console.error(error));
  }
});

function getKeywordsFromOpenAI(text) {
  const model = 'text-davinci-002';
  const prompt = `Extract keywords from this text: ${text}`;
  const data = {
    'prompt': prompt,
    'model': model,
    'max_tokens': 50,
    'temperature': 0.5
  };

  return fetch(`https://api.openai.com/v1/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${openAiApiKey}`
    },
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(data => {
    const keywords = data.choices[0].text.split(',').map(keyword => keyword.trim());
    return keywords.slice(0, 3); // Return up to 3 keywords
  });
}

function sendTextToServer(text, keywords) {
  const fileName = keywords.join('-') + '.txt';
  fetch(`http://your-web-server-ip:port/capture-text?filename=${fileName}`, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain' },
    body: text
  })
  .then(response => response.text())
  .then(data => console.log(data))
  .catch(error => console.error(error));
}
