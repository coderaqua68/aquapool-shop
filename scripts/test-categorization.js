/**
 * Тест категоризации товаров для демонстрации работы парсера
 */

class CategoryTester {
  constructor() {
    // Тестовые названия товаров из intex-bassein.ru
    this.testProducts = [
      "Каркасный бассейн Intex Metal Frame 457x122 см 26726",
      "Каркасный бассейн Bestway Steel Pro 366x122 см 56418",
      "Надувной бассейн Intex Easy Set 305x76 см 28120",
      "Детский надувной бассейн Intex Rainbow Ring 147x33 см",
      "Детский игровой центр Bestway Play Pool 211x150x81 см",
      "Джакузи Intex PureSpa Bubble Massage 196x71 см",
      "Джакузи Bestway Lay-Z-Spa Miami 180x66 см",
      "Морозоустойчивый бассейн Лагуна 550x132 см",
      "Бассейн Summer Fun Supreme 400x120 см",
      "Чаша для бассейна Intex 457 см синяя",
      "Запасная чаша Bestway 366 см голубая",
      "Лайнер Azuro для бассейна 550x132 см"
    ];
  }

  /**
   * Определение бренда по названию
   */
  determineBrand(name) {
    const nameLower = name.toLowerCase();
    
    // Основные бренды каркасных и надувных бассейнов
    if (nameLower.includes('intex')) return 'Intex';
    if (nameLower.includes('bestway')) return 'Bestway';
    
    // Морозоустойчивые бассейны
    if (nameLower.includes('лагуна') || nameLower.includes('laguna')) return 'Лагуна';
    if (nameLower.includes('summer fun')) return 'Summer Fun';
    if (nameLower.includes('magic pool')) return 'Magic Pool';
    if (nameLower.includes('gre')) return 'GRE';
    
    // Чаши
    if (nameLower.includes('azuro')) return 'Azuro';
    if (nameLower.includes('atlantic pool')) return 'Atlantic Pool';
    if (nameLower.includes('larimar')) return 'Larimar';
    
    return null;
  }

  /**
   * Определение категории по названию
   */
  determineCategory(name) {
    const nameLower = name.toLowerCase();
    
    // Определяем бренд для более точной категоризации
    const brand = this.determineBrand(name);
    
    // Каркасные бассейны
    if (nameLower.includes('каркасный')) {
      if (brand === 'Intex') {
        return 'intex-karkasnye'; // INTEX подкатегория
      } else if (brand === 'Bestway') {
        return 'bestway-karkasnye'; // Bestway подкатегория
      }
      return 'karkasnye-basseyny'; // Общая категория каркасных
    }
    
    // Детские центры (проверяем раньше надувных)
    if (nameLower.includes('центр') || nameLower.includes('игровой')) {
      return 'detskie-centry'; // Детские центры
    }
    
    // Надувные бассейны
    if (nameLower.includes('надувной')) {
      if (nameLower.includes('детский') || nameLower.includes('детей')) {
        return 'detskie-basseyny'; // Детские бассейны
      }
      if (nameLower.includes('easy set') || nameLower.includes('изи сет')) {
        return 'intex-easy-set'; // INTEX Easy Set
      }
      return 'naduvnye-basseyny'; // Общая категория надувных
    }
    
    // Джакузи
    if (nameLower.includes('джакузи') || nameLower.includes('spa') || nameLower.includes('спа')) {
      if (brand === 'Intex') {
        return 'dzjakuzi-intex';
      } else if (brand === 'Bestway') {
        return 'dzjakuzi-bestway';
      }
    }
    
    // Морозоустойчивые бассейны
    if (nameLower.includes('морозоустойчив') || brand === 'Лагуна' || brand === 'Summer Fun') {
      if (brand === 'Лагуна') return 'laguna';
      if (brand === 'Summer Fun') return 'summer-fun';
      if (brand === 'Magic Pool') return 'magic-pool';
      if (brand === 'GRE') return 'gre';
      return 'morozostojkie-basseyny';
    }
    
    // Запасные чаши
    if (nameLower.includes('чаша') || nameLower.includes('лайнер')) {
      if (brand === 'Bestway') return 'chashi-bestway';
      if (brand === 'Intex') return 'chashi-intex';
      if (brand === 'Лагуна') return 'chashi-laguna';
      if (brand === 'Azuro') return 'chashi-azuro';
      if (brand === 'GRE') return 'chashi-gre';
      if (brand === 'Atlantic Pool') return 'chashi-atlantic-pool';
      if (brand === 'Larimar') return 'chashi-larimar';
      return 'zapasnye-chashi';
    }
    
    // По умолчанию каркасные бассейны
    return 'karkasnye-basseyny';
  }

  /**
   * Получение названия категории по slug
   */
  getCategoryName(slug) {
    const categoryMap = {
      'karkasnye-basseyny': 'Каркасные бассейны',
      'intex-karkasnye': 'Каркасные бассейны → INTEX',
      'bestway-karkasnye': 'Каркасные бассейны → Bestway',
      'naduvnye-basseyny': 'Надувные бассейны',
      'detskie-basseyny': 'Надувные бассейны → Детские бассейны',
      'detskie-centry': 'Надувные бассейны → Детские центры',
      'intex-easy-set': 'Надувные бассейны → INTEX Easy Set',
      'dzjakuzi-intex': 'Джакузи INTEX',
      'dzjakuzi-bestway': 'Джакузи Bestway',
      'morozostojkie-basseyny': 'Морозоустойчивые бассейны',
      'laguna': 'Морозоустойчивые бассейны → Лагуна',
      'summer-fun': 'Морозоустойчивые бассейны → Summer Fun',
      'magic-pool': 'Морозоустойчивые бассейны → Magic Pool',
      'gre': 'Морозоустойчивые бассейны → GRE',
      'zapasnye-chashi': 'Запасные чаши',
      'chashi-bestway': 'Запасные чаши → Чаши Bestway',
      'chashi-intex': 'Запасные чаши → Чаши INTEX',
      'chashi-laguna': 'Запасные чаши → Чаши Лагуна',
      'chashi-azuro': 'Запасные чаши → Чаши Azuro',
      'chashi-gre': 'Запасные чаши → Чаши GRE',
      'chashi-atlantic-pool': 'Запасные чаши → Чаши Atlantic Pool',
      'chashi-larimar': 'Запасные чаши → Чаши Larimar'
    };
    
    return categoryMap[slug] || slug;
  }

  /**
   * Тестирование категоризации
   */
  testCategorization() {
    console.log('=== ТЕСТ АВТОМАТИЧЕСКОЙ КАТЕГОРИЗАЦИИ ===\n');
    
    console.log('Проверяем, как парсер будет распределять товары по категориям:\n');
    
    this.testProducts.forEach((productName, index) => {
      const brand = this.determineBrand(productName);
      const categorySlug = this.determineCategory(productName);
      const categoryName = this.getCategoryName(categorySlug);
      
      console.log(`${index + 1}. "${productName}"`);
      console.log(`   Бренд: ${brand || 'Не определен'}`);
      console.log(`   Категория: ${categoryName}`);
      console.log(`   Slug: ${categorySlug}\n`);
    });
    
    // Подводим итоги
    const categoryStats = {};
    this.testProducts.forEach(productName => {
      const categorySlug = this.determineCategory(productName);
      const categoryName = this.getCategoryName(categorySlug);
      categoryStats[categoryName] = (categoryStats[categoryName] || 0) + 1;
    });
    
    console.log('=== СТАТИСТИКА РАСПРЕДЕЛЕНИЯ ===');
    Object.entries(categoryStats).forEach(([category, count]) => {
      console.log(`${category}: ${count} товар(ов)`);
    });
  }
}

// Запускаем тест
const tester = new CategoryTester();
tester.testCategorization();