document.addEventListener('DOMContentLoaded', function() {
    // Extract text from breadcrumb element
    const breadcrumbText = document.querySelector('li.breadcrumb-item.active').textContent;

    // Get current timestamp
    const timestamp = new Date().toISOString();

    // Send data to background script
    chrome.runtime.sendMessage({
        type: 'pageInfo',
        data: {
            headline: breadcrumbText,
            timestamp: timestamp,
            event: "page loaded"
        }
    });
});



