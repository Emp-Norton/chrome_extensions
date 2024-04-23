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
