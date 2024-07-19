// Example background script if needed
chrome.runtime.onInstalled.addListener(() => {
  console.log('Extension installed');
  console.log(process.env)
});
