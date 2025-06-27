#!/bin/bash

echo "🚀 Настройка инструментов для парсинга каталога intex-bassein.ru"

# Установка Node.js зависимостей для парсинга
echo "📦 Установка зависимостей..."
npm install --save-dev puppeteer playwright axios cheerio

# Создание директорий для изображений
echo "📁 Создание директорий..."
mkdir -p public/images/products
mkdir -p scripts/data

# Создание конфигурационного файла
echo "⚙️ Создание конфигурации..."
cat > scripts/scraper-config.json << EOL
{
  "baseUrl": "https://intex-bassein.ru",
  "startUrls": [
    "/catalog/karkasnye-basseyny/",
    "/catalog/naduvnye-basseyny/",
    "/catalog/oborudovanie/",
    "/catalog/khimiya/",
    "/catalog/aksessuary/"
  ],
  "delays": {
    "betweenPages": 2000,
    "betweenProducts": 1000,
    "imageDownload": 500
  },
  "limits": {
    "maxProductsPerCategory": 50,
    "maxCategories": 10,
    "maxImagesPerProduct": 5
  },
  "selectors": {
    "productItems": ".catalog-item, .product-item, .item",
    "productName": ".item-title a, .product-name a, h3 a",
    "productPrice": ".price-current, .price, .cost",
    "productOldPrice": ".price-old, .old-price",
    "productImage": "img",
    "productLink": "a",
    "nextPage": ".pagination .next, .bx-pagination-next"
  }
}
EOL

echo "✅ Настройка завершена!"
echo ""
echo "🔧 Доступные команды:"
echo "  npm run scrape:test    - Тестовый парсинг (1 категория)"
echo "  npm run scrape:full    - Полный парсинг всего каталога"
echo "  npm run import:data    - Импорт спарсенных данных"
echo ""
echo "📋 Пошаговая инструкция:"
echo "  1. Запустите: npm run scrape:test"
echo "  2. Проверьте результаты в scripts/data/"
echo "  3. При успехе запустите: npm run scrape:full"
echo "  4. Импортируйте данные: npm run import:data scraped-data.json"