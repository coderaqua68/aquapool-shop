// Background service worker for Intex Pool Scraper
class BackgroundService {
  constructor() {
    this.setupMessageHandlers();
  }

  setupMessageHandlers() {
    // Handle installation
    chrome.runtime.onInstalled.addListener(() => {
      console.log('Intex Pool Scraper installed');
    });

    // Handle messages from content scripts and popup
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      this.handleMessage(request, sender, sendResponse);
      return true; // Keep message channel open
    });
  }

  async handleMessage(request, sender, sendResponse) {
    try {
      switch (request.action) {
        case 'fetchPage':
          const pageData = await this.fetchPage(request.url);
          sendResponse({ success: true, data: pageData });
          break;
          
        case 'saveData':
          await this.saveScrapedData(request.data);
          sendResponse({ success: true });
          break;
          
        case 'loadData':
          const data = await this.loadScrapedData();
          sendResponse({ success: true, data: data });
          break;
          
        default:
          sendResponse({ success: false, error: 'Unknown action' });
      }
    } catch (error) {
      console.error('Background script error:', error);
      sendResponse({ success: false, error: error.message });
    }
  }

  async fetchPage(url) {
    try {
      const response = await fetch(url);
      const html = await response.text();
      return html;
    } catch (error) {
      throw new Error(`Failed to fetch ${url}: ${error.message}`);
    }
  }

  async saveScrapedData(data) {
    return chrome.storage.local.set({ scrapedProducts: data });
  }

  async loadScrapedData() {
    const result = await chrome.storage.local.get(['scrapedProducts']);
    return result.scrapedProducts || [];
  }
}

// Initialize background service
new BackgroundService();