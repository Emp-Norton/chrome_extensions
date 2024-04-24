document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('inject-button').addEventListener('click', function () {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const activeTab = tabs[0];
        chrome.scripting.executeScript({
          target: { tabId: activeTab.id },
          function: injectCustomScript,
        });
      });
    });
});

function injectCustomScript() {
    console.log('Custom script injected!');
    document.querySelectorAll('time').forEach((el)=>{
        el.innerText += `\n ${new Date(1 * el.dateTime).toLocaleTimeString()}`
    });
}  
