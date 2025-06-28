/**
 * Скрипт для создания правильной структуры категорий
 */

const categoriesData = [
  // Основные категории
  {
    name: "Каркасные бассейны",
    slug: "karkasnye-basseyny",
    description: "Прочные и долговечные каркасные бассейны",
    level: 0,
    sortOrder: 1,
    subcategories: [
      { name: "INTEX", slug: "karkasnye-intex" },
      { name: "Bestway", slug: "karkasnye-bestway" }
    ]
  },
  {
    name: "Морозоустойчивые бассейны",
    slug: "morozoustoychivye-basseyny", 
    description: "Всесезонные морозоустойчивые бассейны",
    level: 0,
    sortOrder: 2,
    subcategories: [
      { name: "Лагуна", slug: "morozo-laguna" },
      { name: "Summer Fun", slug: "morozo-summer-fun" },
      { name: "Magic Pool", slug: "morozo-magic-pool" },
      { name: "GRE", slug: "morozo-gre" }
    ]
  },
  {
    name: "Надувные бассейны",
    slug: "naduvnye-basseyny",
    description: "Легкие и мобильные надувные бассейны",
    level: 0,
    sortOrder: 3,
    subcategories: [
      { name: "Детские бассейны", slug: "naduvnye-detskie" },
      { name: "Детские центры", slug: "naduvnye-tsentry" },
      { name: "INTEX Easy Set", slug: "naduvnye-intex-easy-set" }
    ]
  },
  {
    name: "Джакузи INTEX",
    slug: "dzhakuzi-intex",
    description: "Надувные СПА и джакузи от INTEX",
    level: 0,
    sortOrder: 4
  },
  {
    name: "Джакузи Bestway",
    slug: "dzhakuzi-bestway", 
    description: "Надувные СПА и джакузи от Bestway",
    level: 0,
    sortOrder: 5
  },
  {
    name: "Запасные чаши для бассейнов",
    slug: "zapasnyye-chashi",
    description: "Запасные чаши и лайнеры для бассейнов",
    level: 0,
    sortOrder: 6,
    subcategories: [
      { name: "Чаши Bestway", slug: "chashi-bestway" },
      { name: "Чаши INTEX", slug: "chashi-intex" },
      { name: "Чаши Лагуна", slug: "chashi-laguna" },
      { name: "Чаши Azuro", slug: "chashi-azuro" },
      { name: "Чаши GRE", slug: "chashi-gre" },
      { name: "Чаши Atlantic Pool", slug: "chashi-atlantic-pool" },
      { name: "Чаши Larimar", slug: "chashi-larimar" }
    ]
  }
];

// Функция для генерации SQL-запросов
function generateCategoriesSQL() {
  let sql = "-- Очистка существующих категорий\nDELETE FROM categories;\n\n";
  
  let categoryId = 1;
  
  categoriesData.forEach(category => {
    // Добавляем основную категорию
    sql += `INSERT INTO categories (id, name, slug, description, level, sort_order, parent_id) VALUES (${categoryId}, '${category.name}', '${category.slug}', '${category.description}', ${category.level}, ${category.sortOrder}, NULL);\n`;
    
    const parentId = categoryId;
    categoryId++;
    
    // Добавляем подкатегории если есть
    if (category.subcategories) {
      category.subcategories.forEach((subcategory, index) => {
        sql += `INSERT INTO categories (id, name, slug, description, level, sort_order, parent_id) VALUES (${categoryId}, '${subcategory.name}', '${subcategory.slug}', '', 1, ${index + 1}, ${parentId});\n`;
        categoryId++;
      });
    }
    
    sql += "\n";
  });
  
  // Сброс последовательности
  sql += `ALTER SEQUENCE categories_id_seq RESTART WITH ${categoryId};\n`;
  
  return sql;
}

console.log(generateCategoriesSQL());