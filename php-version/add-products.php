<?php
try {
    $pdo = new PDO(
        'mysql:host=localhost;dbname=aquapool_db;charset=utf8mb4',
        'aquapool_db',
        '42892Xxx!',
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
    );
    
    echo "<h2>Добавление товаров AquaPool</h2>";
    
    // Добавляем дополнительные категории
    $categories = [
        ['name' => 'INTEX каркасные', 'slug' => 'intex-karkasnye', 'parent_id' => 1, 'parent_slug' => 'karkasnye-basseyny'],
        ['name' => 'Bestway каркасные', 'slug' => 'bestway-karkasnye', 'parent_id' => 1, 'parent_slug' => 'karkasnye-basseyny'],
        ['name' => 'Laguna морозоустойчивые', 'slug' => 'laguna-morozostojkie', 'parent_id' => 2, 'parent_slug' => 'morozoustoychivye-basseyny'],
        ['name' => 'INTEX джакузи', 'slug' => 'intex-dzhakuzi', 'parent_id' => 3, 'parent_slug' => 'dzhakuzi'],
        ['name' => 'Bestway джакузи', 'slug' => 'bestway-dzhakuzi', 'parent_id' => 3, 'parent_slug' => 'dzhakuzi']
    ];
    
    foreach ($categories as $cat) {
        $stmt = $pdo->prepare("INSERT IGNORE INTO categories (name, slug, parent_id, parent_slug, description) VALUES (?, ?, ?, ?, ?)");
        $stmt->execute([$cat['name'], $cat['slug'], $cat['parent_id'], $cat['parent_slug'], $cat['name']]);
    }
    
    echo "✅ Категории добавлены<br>";
    
    // Получаем ID категорий
    $catIds = [];
    $stmt = $pdo->query("SELECT id, slug FROM categories");
    while ($row = $stmt->fetch()) {
        $catIds[$row['slug']] = $row['id'];
    }
    
    // Добавляем товары
    $products = [
        // INTEX каркасные
        ['name' => 'INTEX Metal Frame 244x51 см', 'sku' => 'INT28205', 'price' => 4500, 'original_price' => 5200, 'brand' => 'INTEX', 'category' => 'intex-karkasnye', 'rating' => 4.2, 'reviews' => 16],
        ['name' => 'INTEX Metal Frame 305x76 см', 'sku' => 'INT28200', 'price' => 6800, 'original_price' => 7500, 'brand' => 'INTEX', 'category' => 'intex-karkasnye', 'rating' => 4.4, 'reviews' => 32],
        ['name' => 'INTEX Metal Frame 366x76 см', 'sku' => 'INT28210', 'price' => 8500, 'original_price' => 9500, 'brand' => 'INTEX', 'category' => 'intex-karkasnye', 'rating' => 4.5, 'reviews' => 28],
        ['name' => 'INTEX Metal Frame 457x84 см', 'sku' => 'INT28211', 'price' => 12500, 'original_price' => 14000, 'brand' => 'INTEX', 'category' => 'intex-karkasnye', 'rating' => 4.6, 'reviews' => 45],
        ['name' => 'INTEX Prism Frame 305x76 см', 'sku' => 'INT26700', 'price' => 7200, 'original_price' => 8100, 'brand' => 'INTEX', 'category' => 'intex-karkasnye', 'rating' => 4.3, 'reviews' => 21],
        ['name' => 'INTEX Prism Frame 366x99 см', 'sku' => 'INT26716', 'price' => 9800, 'original_price' => 11200, 'brand' => 'INTEX', 'category' => 'intex-karkasnye', 'rating' => 4.7, 'reviews' => 38],
        
        // Bestway каркасные  
        ['name' => 'Bestway Steel Pro 305x76 см', 'sku' => 'BST56408', 'price' => 7200, 'original_price' => 8000, 'brand' => 'Bestway', 'category' => 'bestway-karkasnye', 'rating' => 4.3, 'reviews' => 18],
        ['name' => 'Bestway Steel Pro 366x76 см', 'sku' => 'BST56416', 'price' => 8900, 'original_price' => 9800, 'brand' => 'Bestway', 'category' => 'bestway-karkasnye', 'rating' => 4.4, 'reviews' => 25],
        ['name' => 'Bestway Steel Pro 457x84 см', 'sku' => 'BST56438', 'price' => 13200, 'original_price' => 15000, 'brand' => 'Bestway', 'category' => 'bestway-karkasnye', 'rating' => 4.6, 'reviews' => 41],
        ['name' => 'Bestway Power Steel 488x122 см', 'sku' => 'BST56705', 'price' => 22900, 'original_price' => 26500, 'brand' => 'Bestway', 'category' => 'bestway-karkasnye', 'rating' => 4.9, 'reviews' => 63],
        
        // Морозоустойчивые
        ['name' => 'Laguna 4.0x1.5 м морозоустойчивый', 'sku' => 'LAG4015', 'price' => 125000, 'original_price' => 145000, 'brand' => 'Laguna', 'category' => 'laguna-morozostojkie', 'rating' => 4.9, 'reviews' => 15],
        ['name' => 'Laguna 5.0x2.5x1.5 м', 'sku' => 'LAG50255', 'price' => 185000, 'original_price' => 215000, 'brand' => 'Laguna', 'category' => 'laguna-morozostojkie', 'rating' => 5.0, 'reviews' => 8],
        ['name' => 'Laguna 6.0x3.0x1.6 м', 'sku' => 'LAG60316', 'price' => 245000, 'original_price' => 285000, 'brand' => 'Laguna', 'category' => 'laguna-morozostojkie', 'rating' => 4.8, 'reviews' => 6],
        
        // Джакузи INTEX
        ['name' => 'INTEX PureSpa Bubble 196x71 см', 'sku' => 'SPA28426', 'price' => 45000, 'original_price' => 52000, 'brand' => 'INTEX', 'category' => 'intex-dzhakuzi', 'rating' => 4.8, 'reviews' => 42],
        ['name' => 'INTEX PureSpa Plus 216x71 см', 'sku' => 'SPA28428', 'price' => 58000, 'original_price' => 67000, 'brand' => 'INTEX', 'category' => 'intex-dzhakuzi', 'rating' => 4.9, 'reviews' => 38],
        ['name' => 'INTEX Simple Spa 196x66 см', 'sku' => 'SPA28404', 'price' => 35000, 'original_price' => 41000, 'brand' => 'INTEX', 'category' => 'intex-dzhakuzi', 'rating' => 4.4, 'reviews' => 24],
        
        // Джакузи Bestway
        ['name' => 'Bestway LAY-Z-SPA Miami 180x66 см', 'sku' => 'BST54123', 'price' => 32000, 'original_price' => 38000, 'brand' => 'Bestway', 'category' => 'bestway-dzhakuzi', 'rating' => 4.3, 'reviews' => 22],
        ['name' => 'Bestway LAY-Z-SPA Vegas 196x61 см', 'sku' => 'BST54138', 'price' => 48000, 'original_price' => 55000, 'brand' => 'Bestway', 'category' => 'bestway-dzhakuzi', 'rating' => 4.6, 'reviews' => 35],
        ['name' => 'Bestway LAY-Z-SPA Paris 196x66 см', 'sku' => 'BST54148', 'price' => 42000, 'original_price' => 49000, 'brand' => 'Bestway', 'category' => 'bestway-dzhakuzi', 'rating' => 4.5, 'reviews' => 28]
    ];
    
    $added = 0;
    foreach ($products as $prod) {
        if (!isset($catIds[$prod['category']])) continue;
        
        $slug = strtolower(str_replace([' ', 'х'], ['-', 'x'], $prod['name']));
        $slug = preg_replace('/[^a-z0-9\-]/', '', $slug);
        
        $isPopular = $prod['rating'] >= 4.6 ? 1 : 0;
        
        try {
            $stmt = $pdo->prepare("
                INSERT INTO products (name, slug, sku, description, price, original_price, brand, category_id, rating, review_count, is_popular) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ");
            
            $stmt->execute([
                $prod['name'],
                $slug,
                $prod['sku'],
                'Качественный ' . strtolower($prod['name']) . ' от производителя ' . $prod['brand'],
                $prod['price'],
                $prod['original_price'],
                $prod['brand'],
                $catIds[$prod['category']],
                $prod['rating'],
                $prod['reviews'],
                $isPopular
            ]);
            
            $added++;
            echo "✅ Добавлен: " . $prod['name'] . "<br>";
            
        } catch (Exception $e) {
            echo "⚠️ Ошибка: " . $prod['name'] . " - " . $e->getMessage() . "<br>";
        }
    }
    
    echo "<h3>Результат:</h3>";
    echo "📦 Добавлено товаров: $added<br>";
    
    // Показываем статистику
    $stmt = $pdo->query("SELECT COUNT(*) as total FROM products");
    $total = $stmt->fetch()['total'];
    echo "📊 Всего товаров в базе: $total<br>";
    
    $stmt = $pdo->query("SELECT COUNT(*) as popular FROM products WHERE is_popular = 1");
    $popular = $stmt->fetch()['popular'];
    echo "⭐ Популярных товаров: $popular<br>";
    
    echo "<br><a href='/fixed-site.php' style='background: #0891b2; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;'>Посмотреть сайт</a>";
    
} catch (Exception $e) {
    echo "❌ Ошибка подключения: " . $e->getMessage();
}
?>