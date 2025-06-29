import { JSDOM } from 'jsdom';
import fetch from 'node-fetch';

const urls = [
  "https://intex-bassein.ru/catalog/intex-karkasnye-basseyny/karkasnyy-basseyn-intex-ultra-frame-xtr-5-49-x-2-74-x-1-32-m-artikul-26356/",
  "https://intex-bassein.ru/catalog/intex-karkasnye-basseyny/karkasnyy-basseyn-intex-prism-frame-krug-4-57-x-1-22-m-artikul-26726/"
];

async function testSkuExtraction() {
  console.log("Тестируем извлечение артикулов парсером...\n");
  
  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    console.log(`Товар ${i + 1}: ${url}`);
    
    try {
      // Получаем HTML страницы
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
      });
      
      if (!response.ok) {
        console.log(`❌ Ошибка загрузки: ${response.status}`);
        continue;
      }
      
      const html = await response.text();
      const dom = new JSDOM(html);
      const document = dom.window.document;
      
      // Извлекаем название товара
      const nameElement = document.querySelector('h1#pagetitle');
      const name = nameElement ? nameElement.textContent.trim() : 'Название не найдено';
      console.log(`Название: ${name}`);
      
      // Метод 1: Извлечение из названия (как в парсере)
      const skuFromName = extractSkuFromName(name);
      console.log(`Артикул из названия: ${skuFromName || 'не найден'}`);
      
      // Метод 2: Поиск в характеристиках
      const skuFromSpecs = extractSkuFromSpecs(document);
      console.log(`Артикул из характеристик: ${skuFromSpecs || 'не найден'}`);
      
      // Метод 3: Поиск на всей странице
      const skuFromPage = extractSkuFromPage(html);
      console.log(`Артикул со страницы: ${skuFromPage || 'не найден'}`);
      
      console.log("---\n");
      
    } catch (error) {
      console.log(`❌ Ошибка обработки: ${error.message}`);
      console.log("---\n");
    }
    
    // Пауза между запросами
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
}

function extractSkuFromName(name) {
  // Ищем "артикул XXXXX" в названии
  const skuMatch = name.match(/артикул[:\s]+([a-zA-Z0-9-]+)/i);
  if (skuMatch) {
    return skuMatch[1];
  }
  
  // Ищем просто числовой код в конце
  const numberMatch = name.match(/(\d{5,})/);
  if (numberMatch) {
    return numberMatch[1];
  }
  
  return null;
}

function extractSkuFromSpecs(document) {
  // Ищем в основных характеристиках
  const props = document.querySelectorAll('.product-item-detail-properties');
  for (const prop of props) {
    const nameEl = prop.querySelector('.product-item-detail-properties-name');
    const valEl = prop.querySelector('.product-item-detail-properties-val');
    
    if (nameEl && valEl) {
      const key = nameEl.textContent.trim().toLowerCase();
      const value = valEl.textContent.trim();
      
      if (key.includes('артикул') || key.includes('арт') || key.includes('sku')) {
        return value;
      }
    }
  }
  
  // Ищем в детальных характеристиках
  const detailedProps = document.querySelectorAll('.product-item-detail-properties-group-property');
  for (const prop of detailedProps) {
    const nameEl = prop.querySelector('.product-item-detail-properties-group-property-name');
    const valEl = prop.querySelector('.product-item-detail-properties-group-property-val');
    
    if (nameEl && valEl) {
      const key = nameEl.textContent.trim().toLowerCase();
      const value = valEl.textContent.trim();
      
      if (key.includes('артикул') || key.includes('арт') || key.includes('sku')) {
        return value;
      }
    }
  }
  
  return null;
}

function extractSkuFromPage(html) {
  // Ищем все упоминания "артикул" на странице
  const matches = html.match(/артикул[:\s]*([a-zA-Z0-9-]+)/gi);
  if (matches) {
    // Возвращаем первое найденное
    const cleanMatch = matches[0].replace(/артикул[:\s]*/i, '');
    return cleanMatch;
  }
  
  return null;
}

testSkuExtraction().catch(console.error);