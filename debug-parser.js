import fetch from 'node-fetch';
import { JSDOM } from 'jsdom';

async function analyzeProductPage() {
  const url = 'https://intex-bassein.ru/catalog/bestway-karkasnye-basseyny/karkasnyy-basseyn-bestway-round-steel-pro-max-krug-3-66-x-1-22-m-artikul-56420/';
  
  try {
    console.log('Загружаю страницу...');
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });
    
    const html = await response.text();
    const dom = new JSDOM(html);
    const document = dom.window.document;
    
    console.log('\n=== ПОИСК ЦЕН ===');
    
    // Ищем все элементы с ценами
    const priceElements = document.querySelectorAll('*');
    Array.from(priceElements).forEach(el => {
      const text = el.textContent?.trim() || '';
      if (text.includes('26000') || text.includes('35000') || (text.includes('руб') && text.match(/\d+/))) {
        console.log(`Элемент: ${el.tagName}.${el.className}`);
        console.log(`Текст: "${text}"`);
        console.log(`---`);
      }
    });
    
    console.log('\n=== ПОИСК ХАРАКТЕРИСТИК ===');
    
    // Ищем таблицы с характеристиками
    const tables = document.querySelectorAll('table');
    tables.forEach((table, i) => {
      console.log(`Таблица ${i + 1}:`);
      const rows = table.querySelectorAll('tr');
      rows.forEach(row => {
        const cells = row.querySelectorAll('td, th');
        if (cells.length >= 2) {
          const key = cells[0].textContent?.trim();
          const value = cells[1].textContent?.trim();
          if (key && value) {
            console.log(`  ${key}: ${value}`);
          }
        }
      });
      console.log('---');
    });
    
    console.log('\n=== ПОИСК ОПИСАНИЯ ===');
    
    // Ищем блоки с описанием
    const descSelectors = [
      '.product-item-detail-properties-block',
      '.description',
      '[class*="description"]',
      '[class*="detail"]',
      '.content'
    ];
    
    descSelectors.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      if (elements.length > 0) {
        console.log(`Найдено по селектору "${selector}":`);
        elements.forEach((el, i) => {
          console.log(`  Элемент ${i + 1}: ${el.textContent?.trim().substring(0, 200)}...`);
        });
        console.log('---');
      }
    });
    
  } catch (error) {
    console.error('Ошибка:', error);
  }
}

analyzeProductPage();