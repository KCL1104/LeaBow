// This is a service worker that runs in the background

// Listen for installation
chrome.runtime.onInstalled.addListener(() => {
  console.log('Smart Wallet extension installed');
  
  // Initialize storage with default values
  chrome.storage.local.set({
    networkType: 'mainnet',
    gasPreference: 'standard',
    currency: 'usd',
    notification: true,
    walletInitialized: true, // Set to true for demo
    theme: 'highContrast'
  });
});