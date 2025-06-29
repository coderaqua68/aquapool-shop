import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertOrderSchema, insertConsultationSchema, insertProductSchema } from "@shared/schema";
import { sendConsultationRequest, sendOrderNotification, testTelegramBot } from "./telegram";
import fetch from "node-fetch";
import { JSDOM } from "jsdom";

// Function to generate URL-friendly slug from product name
function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[а-яё]/g, (char) => {
      const translitMap: { [key: string]: string } = {
        'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'e',
        'ж': 'zh', 'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm',
        'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u',
        'ф': 'f', 'х': 'h', 'ц': 'ts', 'ч': 'ch', 'ш': 'sh', 'щ': 'sch', 'ъ': '',
        'ы': 'y', 'ь': '', 'э': 'e', 'ю': 'yu', 'я': 'ya'
      };
      return translitMap[char] || char;
    })
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 100);
}

// Real parser function for intex-bassein.ru
async function parseProductFromUrl(url: string) {
  try {
    console.log(`Parsing product from: ${url}`);
    
    // Fetch the page
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const html = await response.text();
    const dom = new JSDOM(html);
    const document = dom.window.document;
    
    // Extract product name
    const nameElement = document.querySelector('h1') || 
                       document.querySelector('.product-title') ||
                       document.querySelector('[class*="title"]');
    const name = nameElement?.textContent?.trim() || 'Товар без названия';
    
    // Extract prices more aggressively from intex-bassein.ru
    let price = "0";
    let originalPrice = null;
    
    console.log('Looking for prices...');
    
    // Try multiple selectors for prices
    const priceSelectors = [
      '.product-item-price-current',
      '.product-item-price',
      '.price-current',
      '.current-price',
      '.price',
      '[class*="price"]'
    ];
    
    // Look for current price
    for (const selector of priceSelectors) {
      const priceEl = document.querySelector(selector);
      if (priceEl) {
        const priceText = priceEl.textContent?.trim() || '';
        console.log(`Found price element (${selector}): ${priceText}`);
        const priceMatch = priceText.match(/(\d+[\s,.]?\d*)/);
        if (priceMatch) {
          price = priceMatch[1].replace(/[\s,.]/g, '');
          console.log(`Extracted current price: ${price}`);
          break;
        }
      }
    }
    
    // Look for old price
    const oldPriceSelectors = [
      '.product-item-price-old',
      '.price-old',
      '.old-price',
      '.price-before'
    ];
    
    for (const selector of oldPriceSelectors) {
      const oldPriceEl = document.querySelector(selector);
      if (oldPriceEl) {
        const oldPriceText = oldPriceEl.textContent?.trim() || '';
        console.log(`Found old price element (${selector}): ${oldPriceText}`);
        const oldPriceMatch = oldPriceText.match(/(\d+[\s,.]?\d*)/);
        if (oldPriceMatch) {
          originalPrice = oldPriceMatch[1].replace(/[\s,.]/g, '');
          console.log(`Extracted old price: ${originalPrice}`);
          break;
        }
      }
    }
    
    // If still no price found, search in all text content for common price patterns
    if (price === "0") {
      console.log('No price found in specific elements, searching in all text...');
      const allElements = Array.from(document.querySelectorAll('*'));
      const pricePatterns = [
        /(\d+)\s*000\s*руб/,  // "26000 руб", "35000 руб"
        /(\d+)\s*руб/,        // "26000руб", "35000руб"
        /(\d{4,6})/           // any 4-6 digit number
      ];
      
      for (const el of allElements) {
        const text = el.textContent?.trim() || '';
        for (const pattern of pricePatterns) {
          const match = text.match(pattern);
          if (match) {
            const foundPrice = match[1];
            if (foundPrice.length >= 4) { // reasonable price length
              if (price === "0") {
                price = foundPrice;
                console.log(`Found price in text: ${price} from "${text}"`);
              } else if (!originalPrice && foundPrice !== price) {
                originalPrice = foundPrice;
                console.log(`Found original price in text: ${originalPrice} from "${text}"`);
              }
            }
          }
        }
        if (price !== "0" && originalPrice) break;
      }
    }
    
    console.log(`Final prices - current: ${price}, original: ${originalPrice}`);
    
    // Extract SKU from specific HTML element or URL as fallback
    let sku = `PROD-${Date.now()}`;
    
    // First priority: Extract from .product-item-detail-article span
    const artikulElement = document.querySelector('.product-item-detail-article span');
    if (artikulElement) {
      const artikulText = artikulElement.textContent?.trim();
      if (artikulText) {
        sku = artikulText;
        console.log(`Found SKU from HTML element: ${sku}`);
      }
    } else {
      // Fallback: Extract from URL
      const artikulMatch = url.match(/artikul?[_-]([^\/]+)/);
      if (artikulMatch) {
        sku = artikulMatch[1].replace(/-[^-]*$/, ''); // Remove color suffix like "-korichnevyy"
        console.log(`Found SKU from URL: ${sku}`);
      } else {
        console.log(`No SKU found, using generated: ${sku}`);
      }
    }
    
    // Extract description - create formatted description from product data
    let description = '';
    
    // Extract separate description and composition from intex-bassein.ru
    let foundDescription = false;
    let composition = '';
    
    // Function to remove clickable links while keeping text content
    const removeClickableLinks = (html: string): string => {
      return html.replace(/<a[^>]*>(.*?)<\/a>/gi, '$1');
    };
    
    // Function to replace package images with local icon
    const replacePackageImages = (html: string): string => {
      return html.replace(
        /<img[^>]*src="[^"]*ac672c30d0d9dc49688f1ab82d73261d[^"]*"[^>]*>/gi,
        '<img width="90" alt="Размер упаковки" src="/package-icon.png" height="82" align="left" style="margin-right: 15px" title="Размер упаковки">'
      );
    };
    
    // 1. Get composition (комплектация)
    const compositionElement = document.querySelector('[data-value="free-tab"] .toggle_content');
    if (compositionElement) {
      const rawComposition = compositionElement.innerHTML?.trim() || '';
      composition = removeClickableLinks(rawComposition);
      composition = replacePackageImages(composition);
      console.log(`Found composition: ${composition.substring(0, 100)}...`);
    }
    
    // 2. Get main description (only description, no composition)
    const descriptionElement = document.querySelector('[data-value="description"] .toggle_content');
    if (descriptionElement) {
      const rawDescription = descriptionElement.innerHTML?.trim() || '';
      description = removeClickableLinks(rawDescription);
      description = replacePackageImages(description);
      foundDescription = true;
      console.log(`Found main description: ${description.substring(0, 100)}...`);
    }
    
    // Fallback: try other selectors if nothing found
    if (!foundDescription) {
      const fallbackSelectors = [
        '.toggle_content',
        '.product-item-detail-text',
        '.product-description',
        '.product-detail-description',
        '[class*="description"]'
      ];
      
      for (const selector of fallbackSelectors) {
        const elements = Array.from(document.querySelectorAll(selector));
        if (elements.length > 0) {
          description = elements.map(el => el.innerHTML?.trim()).filter(Boolean).join('\n\n');
          if (description && description.length > 10) {
            foundDescription = true;
            console.log(`Found description from fallback selector ${selector}: ${description.substring(0, 100)}...`);
            break;
          }
        }
      }
    }
    
    // If no dedicated description found, create one from the product data
    if (!foundDescription || description.length < 50) {
      description = `<h2>${name}</h2>
<p>Качественный каркасный бассейн от известного производителя. Отличное решение для дачи и загородного дома.</p>

<h3>В комплект поставки входит:</h3>
<ul>
<li>Каркасный бассейн</li>
<li>Картриджный насос-фильтр</li>
<li>Фильтрующий картридж</li>
<li>Лестница</li>
<li>Тент для бассейна</li>
<li>Руководство по эксплуатации</li>
</ul>

<p>Бассейн снизу оборудован сливным клапаном для удобного слива воды. Металлический каркас состоит из соединительных уголков, трубок-перемычек и стоек. Все детали окрашены и устойчивы к истиранию.</p>`;
    }
    
    // Extract specifications from intex-bassein.ru specific structure
    const specs: Record<string, string> = {};
    
    // Extract from the main properties block (short specs)
    const mainPropsElements = Array.from(document.querySelectorAll('.product-item-detail-properties'));
    mainPropsElements.forEach(prop => {
      const nameEl = prop.querySelector('.product-item-detail-properties-name');
      const valEl = prop.querySelector('.product-item-detail-properties-val');
      if (nameEl && valEl) {
        const key = nameEl.textContent?.trim() || '';
        const value = valEl.textContent?.trim() || '';
        if (key && value) {
          specs[key] = value;
        }
      }
    });
    
    // Extract from the detailed properties block (full specs)
    const detailedPropsElements = Array.from(document.querySelectorAll('.product-item-detail-properties-group-property'));
    detailedPropsElements.forEach(prop => {
      const nameEl = prop.querySelector('.product-item-detail-properties-group-property-name');
      const valEl = prop.querySelector('.product-item-detail-properties-group-property-val');
      if (nameEl && valEl) {
        const key = nameEl.textContent?.trim() || '';
        const value = valEl.textContent?.trim() || '';
        if (key && value) {
          specs[key] = value;
        }
      }
    });
    
    // Extract brand from name or specs
    let brand = 'Intex';
    if (name.toLowerCase().includes('bestway')) brand = 'Bestway';
    else if (name.toLowerCase().includes('intex')) brand = 'Intex';
    else if (specs['Бренд']) brand = specs['Бренд'];
    
    // Determine category
    let category = 'frame-pools';
    if (name.toLowerCase().includes('надувной')) category = 'inflatable-pools';
    else if (name.toLowerCase().includes('детский')) category = 'kids-pools';
    else if (url.includes('karkasnye')) category = 'frame-pools';
    
    // Extract dimensions and volume
    const dimensionMatch = name.match(/(\d+[,.]?\d*)\s*[xх×]\s*(\d+[,.]?\d*)\s*[xх×]?\s*(\d+[,.]?\d*)?/);
    let dimensions = '';
    let volume = '';
    
    if (dimensionMatch) {
      const width = dimensionMatch[1].replace(',', '.');
      const length = dimensionMatch[2].replace(',', '.');
      const height = dimensionMatch[3]?.replace(',', '.') || '';
      dimensions = height ? `${width} x ${length} x ${height}` : `${width} x ${length}`;
    }
    
    // Extract volume from specs or name
    if (specs['Объем']) {
      volume = specs['Объем'].replace(/[^\d]/g, '');
    } else {
      const volumeMatch = name.match(/(\d+[\s,.]?\d*)\s*л/);
      if (volumeMatch) {
        volume = volumeMatch[1].replace(/[\s,.]/g, '');
      }
    }
    
    // Extract main product image (single best quality image without watermark)
    let imageUrl = "/api/placeholder/400/400";
    
    // First priority: Look for images in "main_product" section (these are without watermark)
    const recommendedSelectors = [
      '.main_product img',
      '.main_product .img img',
      '.catalog-block-item img',
      '.product-item-detail-tabs-content img'
    ];
    
    // Try each selector to find images without watermark
    for (const selector of recommendedSelectors) {
      const imgElement = document.querySelector(selector);
      if (imgElement) {
        const src = imgElement.getAttribute('src');
        console.log(`Checking selector ${selector}, found image: ${src}`);
        
        if (src && src.includes('upload') && !src.includes('thumb') && !src.includes('small') && !src.includes('watermark')) {
          // Skip generic/common images
          if (src.includes('2f8e6a1cfe55806934aa37cf1f43bb79') || 
              src.includes('no_photo') || 
              src.includes('placeholder')) {
            console.log(`Skipping generic image: ${src}`);
            continue;
          }
          
          if (src.startsWith('/')) {
            imageUrl = 'https://intex-bassein.ru' + src;
          } else if (src.startsWith('http')) {
            imageUrl = src;
          }
          console.log(`Found image from main_product section (without watermark): ${imageUrl}`);
          break;
        }
      }
    }
    
    // Second priority: Look for the main product image in typical containers (only if no recommended image found)
    if (imageUrl === "/api/placeholder/400/400") {
      const productImageSelectors = [
        '.bx-pict-big img',
        '.product-item-detail-picture img', 
        '.product-item-picture img',
        '.product-pictures img',
        '.product-gallery img:first-child',
        '.main-image img',
        'img[itemprop="image"]',
        '.bx-pict img'
      ];
      
      // Try each selector to find the main product image
      for (const selector of productImageSelectors) {
      const imgElement = document.querySelector(selector);
      if (imgElement) {
        const src = imgElement.getAttribute('src');
        if (src && src.includes('upload') && !src.includes('thumb') && !src.includes('small')) {
          // Skip generic/common images
          if (src.includes('2f8e6a1cfe55806934aa37cf1f43bb79') || 
              src.includes('no_photo') || 
              src.includes('placeholder')) {
            console.log(`Skipping generic image: ${src}`);
            continue;
          }
          
          if (src.startsWith('/')) {
            imageUrl = 'https://intex-bassein.ru' + src;
          } else if (src.startsWith('http')) {
            imageUrl = src;
          }
          console.log(`Found main product image via selector ${selector}: ${imageUrl}`);
          break;
        }
      }
    }
    
    // Fallback: search all images if specific selectors didn't work  
    if (imageUrl === "/api/placeholder/400/400") {
      console.log(`No image found via selectors, scanning all images...`);
      const allImages = Array.from(document.querySelectorAll('img'));
      console.log(`Found ${allImages.length} total images on page`);
      
      for (let i = 0; i < allImages.length; i++) {
        const imgElement = allImages[i];
        const src = imgElement.getAttribute('src');
        console.log(`Image ${i}: ${src}`);
        
        if (src && src.includes('upload') && !src.includes('thumb') && !src.includes('small') && !src.includes('resize')) {
          // Skip if it contains generic identifiers or common placeholders
          if (src.includes('2f8e6a1cfe55806934aa37cf1f43bb79') || 
              src.includes('no_photo') || 
              src.includes('placeholder') ||
              src.includes('default') ||
              imgElement.getAttribute('alt')?.toLowerCase().includes('логотип')) {
            console.log(`Skipping generic image: ${src}`);
            continue; // Skip generic/placeholder images
          }
          
          if (src.startsWith('/')) {
            imageUrl = 'https://intex-bassein.ru' + src;
          } else if (src.startsWith('http')) {
            imageUrl = src;
          }
          console.log(`Found fallback product image: ${imageUrl}`);
          break;
        }
      }
    }
    }
    
    // Generate short description
    const shortDescription = [
      dimensions ? `Размер: ${dimensions}` : '',
      volume ? `Объем: ${volume} л` : '',
      brand ? `Бренд: ${brand}` : ''
    ].filter(Boolean).join(' • ');
    
    return {
      name,
      slug: generateSlug(name),
      sku,
      description,
      composition,
      shortDescription,
      price,
      originalPrice,
      category,
      brand,
      volume,
      weight: specs['Вес'] || '',
      dimensions,
      material: specs['Материал'] || specs['Материал чаши'] || 'ПВХ',
      color: specs['Цвет'] || 'Голубой',
      frameType: category === 'frame-pools' ? 'Металлический' : null,
      pumpType: specs['Тип насоса'] || 'Картриджный',
      shape: specs['Форма'] || (name.toLowerCase().includes('круг') ? 'Круглый' : 'Прямоугольный'),
      installationType: 'Наземный',
      countryOrigin: specs['Страна-производитель'] || 'Китай',
      imageUrl,
      images: [],
      specifications: JSON.stringify(specs),
      inStock: true,
      isPopular: false,
      isNew: false,
      discount: 0,
      rating: "4.5",
      reviewCount: Math.floor(Math.random() * 50) + 10
    };
    
  } catch (error) {
    console.error(`Error parsing ${url}:`, error);
    throw error;
  }
}

// Простая авторизация для админ панели
const ADMIN_LOGIN = "admin";
const ADMIN_PASSWORD = "aquapool2025";

const adminAuth = (req: any, res: any, next: any) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Basic ')) {
    return res.status(401).json({ message: "Необходима авторизация" });
  }
  
  const credentials = Buffer.from(authHeader.slice(6), 'base64').toString();
  const [login, password] = credentials.split(':');
  
  if (login !== ADMIN_LOGIN || password !== ADMIN_PASSWORD) {
    return res.status(401).json({ message: "Неверный логин или пароль" });
  }
  
  next();
};

export async function registerRoutes(app: Express): Promise<Server> {
  // Products
  app.get("/api/products", async (req, res) => {
    try {
      const filters = {
        category: req.query.category as string,
        brand: req.query.brand as string,
        minPrice: req.query.minPrice ? parseFloat(req.query.minPrice as string) : undefined,
        maxPrice: req.query.maxPrice ? parseFloat(req.query.maxPrice as string) : undefined,
        inStock: req.query.inStock ? req.query.inStock === 'true' : undefined,
        search: req.query.search as string,
        poolType: req.query.poolType as string,
        volumeRange: req.query.volumeRange as string,
        shape: req.query.shape as string,
        material: req.query.material as string,
        dimensions: req.query.dimensions as string,
      };
      
      const products = await storage.getProducts(filters);
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch products" });
    }
  });

  app.get("/api/products/popular", async (req, res) => {
    try {
      const products = await storage.getPopularProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch popular products" });
    }
  });

  // Search suggestions endpoint
  app.get("/api/search/suggestions", async (req, res) => {
    try {
      const query = req.query.q as string;
      if (!query || query.length < 2) {
        return res.json([]);
      }
      
      // Правильная декодировка URL для поддержки кириллицы
      const decodedQuery = decodeURIComponent(query);
      
      const suggestions = await storage.getSearchSuggestions(decodedQuery);
      res.json(suggestions);
    } catch (error) {
      console.error("Error fetching search suggestions:", error);
      res.status(500).json({ message: "Failed to fetch suggestions" });
    }
  });

  app.get("/api/products/:identifier", async (req, res) => {
    try {
      const identifier = req.params.identifier;
      let product;
      
      // Check if identifier is numeric (ID) or string (slug)
      if (/^\d+$/.test(identifier)) {
        const productId = parseInt(identifier);
        product = await storage.getProduct(productId);
      } else {
        product = await storage.getProductBySlug(identifier);
      }
      
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch product" });
    }
  });

  // Categories
  app.get("/api/categories", async (req, res) => {
    try {
      const categories = await storage.getCategories();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch categories" });
    }
  });

  app.get("/api/categories/main", async (req, res) => {
    try {
      const categories = await storage.getMainCategories();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch main categories" });
    }
  });

  app.get("/api/categories/:id/subcategories", async (req, res) => {
    try {
      const parentId = parseInt(req.params.id);
      const subcategories = await storage.getSubcategories(parentId);
      res.json(subcategories);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch subcategories" });
    }
  });

  app.get("/api/categories/:slug", async (req, res) => {
    try {
      const category = await storage.getCategory(req.params.slug);
      
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      
      res.json(category);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch category" });
    }
  });

  app.get("/api/categories/:slug/stats", async (req, res) => {
    try {
      const stats = await storage.getCategoryStats(req.params.slug);
      res.json(stats || { count: 0, minPrice: 0 });
    } catch (error) {
      console.error("Error fetching category stats:", error);
      res.status(500).json({ message: "Failed to fetch category stats" });
    }
  });

  // Orders
  app.post("/api/orders", async (req, res) => {
    try {
      const orderData = insertOrderSchema.parse(req.body);
      const order = await storage.createOrder(orderData);

      // Отправляем уведомление в Telegram
      try {
        await sendOrderNotification({
          orderId: order.id,
          customerName: order.customerName,
          phone: order.customerPhone,
          email: order.customerEmail || 'Не указан',
          deliveryAddress: order.deliveryAddress || 'Не указан',
          items: JSON.parse(order.items),
          totalAmount: order.totalAmount,
          paymentMethod: order.paymentMethod,
          deliveryMethod: order.deliveryMethod
        });
        console.log(`Уведомление о заказе #${order.id} отправлено в Telegram`);
      } catch (telegramError) {
        console.error('Ошибка отправки уведомления о заказе в Telegram:', telegramError);
        // Не прерываем выполнение, заказ должен быть создан даже если Telegram недоступен
      }

      res.status(201).json(order);
    } catch (error) {
      res.status(400).json({ message: "Invalid order data", error });
    }
  });

  // Get specific order by ID
  app.get("/api/orders/:id", async (req, res) => {
    try {
      const orderId = parseInt(req.params.id);
      if (isNaN(orderId)) {
        return res.status(400).json({ message: "Invalid order ID" });
      }

      const order = await storage.getOrder(orderId);
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }

      res.json(order);
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  });

  // Consultations
  app.post("/api/consultations", async (req, res) => {
    try {
      const consultationData = insertConsultationSchema.parse(req.body);
      const consultation = await storage.createConsultation(consultationData);

      // Отправляем заявку на консультацию в Telegram
      try {
        await sendConsultationRequest({
          name: consultation.name,
          phone: consultation.phone,
          message: consultation.message || 'Запрос консультации'
        });
        console.log(`Заявка на консультацию от ${consultation.name} отправлена в Telegram`);
      } catch (telegramError) {
        console.error('Ошибка отправки заявки на консультацию в Telegram:', telegramError);
        // Не прерываем выполнение, консультация должна быть создана даже если Telegram недоступен
      }

      res.status(201).json(consultation);
    } catch (error) {
      res.status(400).json({ message: "Invalid consultation data", error });
    }
  });

  // Telegram bot test endpoint
  app.get("/api/telegram/test", async (req, res) => {
    try {
      const result = await testTelegramBot();
      res.json(result);
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Ошибка тестирования Telegram бота", 
        error: error 
      });
    }
  });

  // Admin API routes
  app.post("/api/admin/login", (req, res) => {
    const { login, password } = req.body;
    
    if (login === ADMIN_LOGIN && password === ADMIN_PASSWORD) {
      const token = Buffer.from(`${login}:${password}`).toString('base64');
      res.json({ 
        success: true, 
        message: "Авторизация успешна",
        token: `Basic ${token}`
      });
    } else {
      res.status(401).json({ 
        success: false, 
        message: "Неверный логин или пароль" 
      });
    }
  });

  // Admin Products CRUD
  app.post("/api/admin/products", adminAuth, async (req, res) => {
    try {
      const productData = insertProductSchema.parse(req.body);
      const product = await storage.createProduct(productData);
      res.status(201).json(product);
    } catch (error) {
      res.status(400).json({ message: "Ошибка при создании товара", error });
    }
  });

  app.put("/api/admin/products/:id", adminAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updateData = req.body; // Частичное обновление
      const product = await storage.updateProduct(id, updateData);
      
      if (!product) {
        return res.status(404).json({ message: "Товар не найден" });
      }
      
      res.json(product);
    } catch (error) {
      res.status(400).json({ message: "Ошибка при обновлении товара", error });
    }
  });

  app.delete("/api/admin/products/:id", adminAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteProduct(id);
      
      if (!deleted) {
        return res.status(404).json({ message: "Товар не найден" });
      }
      
      res.json({ message: "Товар удален успешно" });
    } catch (error) {
      res.status(500).json({ message: "Ошибка при удалении товара", error });
    }
  });

  // Update product price by SKU
  app.post("/api/admin/products/update-price", adminAuth, async (req, res) => {
    try {
      const { sku, price, originalPrice } = req.body;
      
      if (!sku || !price) {
        return res.status(400).json({ message: "SKU и цена обязательны" });
      }
      
      const updated = await storage.updateProductPriceBySku(sku, price, originalPrice);
      
      if (!updated) {
        return res.status(404).json({ message: "Товар с указанным SKU не найден" });
      }
      
      res.json({ 
        success: true, 
        message: `Цена товара ${sku} обновлена`,
        product: updated
      });
    } catch (error) {
      res.status(500).json({ message: "Ошибка при обновлении цены", error });
    }
  });

  // Parse products from URLs (mock implementation for demo)
  app.post("/api/admin/parse-products", adminAuth, async (req, res) => {
    try {
      const { urls } = req.body;
      
      if (!Array.isArray(urls)) {
        return res.status(400).json({ message: "URLs must be an array" });
      }

      // Реальный парсинг товаров с сайта
      const results = [];
      const errors = [];

      for (let i = 0; i < urls.length; i++) {
        const url = urls[i];
        
        try {
          console.log(`Parsing product ${i + 1}/${urls.length}: ${url}`);
          const product = await parseProductFromUrl(url);
          results.push(product);
          
          // Небольшая пауза между запросами чтобы не перегружать сервер
          await new Promise(resolve => setTimeout(resolve, 500));
        } catch (error) {
          console.error(`Error parsing ${url}:`, error);
          errors.push({
            url,
            error: "Ошибка парсинга: " + (error instanceof Error ? error.message : String(error))
          });
        }
      }
      
      res.json({
        success: true,
        products: results,
        errors
      });
    } catch (error) {
      console.error("Error parsing products:", error);
      res.status(500).json({ message: "Failed to parse products" });
    }
  });

  // Bulk import products from parser
  app.post("/api/admin/import-products", adminAuth, async (req, res) => {
    try {
      const { products } = req.body;
      
      if (!Array.isArray(products)) {
        return res.status(400).json({ message: "Products must be an array" });
      }

      const results = [];
      const errors = [];

      for (let i = 0; i < products.length; i++) {
        try {
          const productData = products[i];
          
          // Validate required fields
          if (!productData.name) {
            throw new Error("Product name is required");
          }

          console.log(`Creating product: ${productData.name} with price: ${productData.price}, originalPrice: ${productData.originalPrice}`);
          
          const product = await storage.createProduct(productData);
          console.log(`Created product with id: ${product.id}, price: ${product.price}, originalPrice: ${product.originalPrice}`);
          results.push(product);
        } catch (error) {
          errors.push({
            index: i,
            product: products[i]?.name || `Product ${i}`,
            error: error instanceof Error ? error.message : String(error)
          });
        }
      }

      res.json({
        success: true,
        imported: results.length,
        errorCount: errors.length,
        results: results,
        errorsList: errors
      });
    } catch (error) {
      console.error("Error importing products:", error);
      res.status(500).json({ message: "Failed to import products" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
