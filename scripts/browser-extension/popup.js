// Popup script for Intex Pool Scraper
class ScraperUI {
  constructor() {
    this.isActive = false;
    this.scrapedData = [];
    this.initializeUI();
    this.loadStoredData();
  }

  initializeUI() {
    // Button event listeners
    document.getElementById('scrapePage').addEventListener('click', () => this.scrapePage());
    document.getElementById('scrapeCategory').addEventListener('click', () => this.scrapeCategory());
    document.getElementById('scrapeAll').addEventListener('click', () => this.scrapeAll());
    document.getElementById('downloadResults').addEventListener('click', () => this.downloadResults());
    document.getElementById('clearResults').addEventListener('click', () => this.clearResults());

    // Check if we're on the right site
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      const currentTab = tabs[0];
      const isIntexSite = currentTab.url.includes('intex-bassein.ru');
      
      if (!isIntexSite) {
        this.updateStatus('inactive', 'Откройте сайт intex-bassein.ru');
        this.disableButtons(true);
      } else {
        this.updateStatus('active', 'Готов к работе');
        this.disableButtons(false);
      }
    });
  }

  async loadStoredData() {
    const result = await chrome.storage.local.get(['scrapedProducts']);
    if (result.scrapedProducts) {
      this.scrapedData = result.scrapedProducts;
      this.updateResults();
    }
  }

  async saveData() {
    await chrome.storage.local.set({scrapedProducts: this.scrapedData});
  }

  updateStatus(type, text) {
    const statusDot = document.getElementById('statusDot');
    const statusText = document.getElementById('statusText');
    
    statusDot.className = `status-dot ${type === 'inactive' ? 'inactive' : ''}`;
    statusText.textContent = text;
  }

  disableButtons(disabled) {
    const buttons = ['scrapePage', 'scrapeCategory', 'scrapeAll'];
    buttons.forEach(id => {
      document.getElementById(id).disabled = disabled;
    });
  }

  updateProgress(count) {
    document.getElementById('progress').style.display = 'block';
    document.getElementById('progressCount').textContent = count;
  }

  updateResults() {
    const resultsDiv = document.getElementById('results');
    const resultsList = document.getElementById('resultsList');
    const downloadBtn = document.getElementById('downloadResults');

    if (this.scrapedData.length > 0) {
      resultsDiv.style.display = 'block';
      downloadBtn.style.display = 'block';
      
      const categories = {};
      this.scrapedData.forEach(item => {
        if (!categories[item.category]) categories[item.category] = 0;
        categories[item.category]++;
      });

      resultsList.innerHTML = Object.entries(categories)
        .map(([cat, count]) => `<div>${cat}: ${count} товаров</div>`)
        .join('') + `<div><strong>Всего: ${this.scrapedData.length} товаров</strong></div>`;
    } else {
      resultsDiv.style.display = 'none';
      downloadBtn.style.display = 'none';
    }
  }

  async scrapePage() {
    this.isActive = true;
    this.updateStatus('active', 'Парсинг страницы...');
    this.disableButtons(true);

    try {
      const [tab] = await chrome.tabs.query({active: true, currentWindow: true});
      
      const response = await chrome.tabs.sendMessage(tab.id, {
        action: 'scrapePage'
      });

      if (response.success) {
        this.addProducts(response.products);
        this.updateStatus('active', `Найдено ${response.products.length} товаров`);
      } else {
        this.updateStatus('inactive', 'Ошибка парсинга');
      }
    } catch (error) {
      console.error('Scraping error:', error);
      this.updateStatus('inactive', 'Ошибка подключения');
    }

    this.isActive = false;
    this.disableButtons(false);
  }

  async scrapeCategory() {
    this.isActive = true;
    this.updateStatus('active', 'Парсинг категории...');
    this.disableButtons(true);

    try {
      const [tab] = await chrome.tabs.query({active: true, currentWindow: true});
      
      const response = await chrome.tabs.sendMessage(tab.id, {
        action: 'scrapeCategory',
        onProgress: (count) => this.updateProgress(count)
      });

      if (response.success) {
        this.addProducts(response.products);
        this.updateStatus('active', `Завершено! ${response.products.length} товаров`);
      } else {
        this.updateStatus('inactive', 'Ошибка парсинга категории');
      }
    } catch (error) {
      console.error('Category scraping error:', error);
      this.updateStatus('inactive', 'Ошибка подключения');
    }

    this.isActive = false;
    this.disableButtons(false);
  }

  async scrapeAll() {
    if (!confirm('Парсинг всего сайта может занять много времени. Продолжить?')) {
      return;
    }

    this.isActive = true;
    this.updateStatus('active', 'Парсинг всего сайта...');
    this.disableButtons(true);

    try {
      const [tab] = await chrome.tabs.query({active: true, currentWindow: true});
      
      const response = await chrome.tabs.sendMessage(tab.id, {
        action: 'scrapeAll',
        onProgress: (count) => this.updateProgress(count)
      });

      if (response.success) {
        this.addProducts(response.products);
        this.updateStatus('active', `Готово! ${response.products.length} товаров`);
      } else {
        this.updateStatus('inactive', 'Ошибка полного парсинга');
      }
    } catch (error) {
      console.error('Full scraping error:', error);
      this.updateStatus('inactive', 'Ошибка подключения');
    }

    this.isActive = false;
    this.disableButtons(false);
  }

  addProducts(products) {
    // Избегаем дублирования по URL
    const existingUrls = new Set(this.scrapedData.map(p => p.url));
    const newProducts = products.filter(p => !existingUrls.has(p.url));
    
    this.scrapedData.push(...newProducts);
    this.saveData();
    this.updateResults();
  }

  downloadResults() {
    if (this.scrapedData.length === 0) {
      alert('Нет данных для скачивания');
      return;
    }

    const dataStr = JSON.stringify({
      products: this.scrapedData,
      timestamp: new Date().toISOString(),
      source: 'Intex Pool Scraper Extension',
      totalCount: this.scrapedData.length
    }, null, 2);

    const blob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(blob);
    
    chrome.downloads.download({
      url: url,
      filename: `intex-products-${Date.now()}.json`,
      saveAs: true
    });
  }

  async clearResults() {
    if (confirm('Удалить все собранные данные?')) {
      this.scrapedData = [];
      await chrome.storage.local.clear();
      this.updateResults();
      document.getElementById('progress').style.display = 'none';
      this.updateStatus('active', 'Данные очищены');
    }
  }
}

// Initialize when popup opens
new ScraperUI();