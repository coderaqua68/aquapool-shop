<?php
echo "<h2>Быстрое добавление товаров</h2>";

try {
    // Подключение с более мягкими настройками
    $pdo = new PDO(
        'mysql:host=localhost;dbname=aquapool_db',
        'aquapool_db',
        '42892Xxx!',
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8mb4"
        ]
    );
    
    echo "✅ Подключение к базе данных успешно<br><br>";
    
    // Проверяем текущее количество товаров
    $stmt = $pdo->query("SELECT COUNT(*) as count FROM products");
    $currentCount = $stmt->fetch()['count'];
    echo "📦 Товаров сейчас в базе: $currentCount<br><br>";
    
    // Добавляем товары по одному
    $products = [
        ['INTEX Metal Frame 244x51 см', 'intex-244x51', 'INT244', 4500, 5200, 'INTEX', 6, 4.2, 16],
        ['INTEX Metal Frame 305x76 см', 'intex-305x76', 'INT305', 6800, 7500, 'INTEX', 6, 4.4, 32],
        ['INTEX Metal Frame 366x76 см', 'intex-366x76', 'INT366', 8500, 9500, 'INTEX', 6, 4.5, 28],
        ['INTEX Metal Frame 457x84 см', 'intex-457x84', 'INT457', 12500, 14000, 'INTEX', 6, 4.6, 45],
        ['Bestway Steel Pro 305x76 см', 'bestway-305x76', 'BST305', 7200, 8000, 'Bestway', 7, 4.3, 18],
        ['Bestway Steel Pro 366x76 см', 'bestway-366x76', 'BST366', 8900, 9800, 'Bestway', 7, 4.4, 25],
        ['Bestway Steel Pro 457x84 см', 'bestway-457x84', 'BST457', 13200, 15000, 'Bestway', 7, 4.6, 41],
        ['INTEX PureSpa Bubble 196x71 см', 'intex-spa-196', 'SPA196', 45000, 52000, 'INTEX', 8, 4.8, 42],
        ['INTEX PureSpa Plus 216x71 см', 'intex-spa-216', 'SPA216', 58000, 67000, 'INTEX', 8, 4.9, 38],
        ['Bestway LAY-Z-SPA Miami 180x66 см', 'bestway-spa-180', 'BST180', 32000, 38000, 'Bestway', 9, 4.3, 22]
    ];
    
    $added = 0;
    foreach ($products as $i => $prod) {
        try {
            $isPopular = $prod[7] >= 4.6 ? 1 : 0;
            
            $stmt = $pdo->prepare("
                INSERT IGNORE INTO products (name, slug, sku, description, price, original_price, brand, category_id, rating, review_count, is_popular) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ");
            
            $result = $stmt->execute([
                $prod[0], // name
                $prod[1], // slug  
                $prod[2], // sku
                'Качественный бассейн ' . $prod[0],
                $prod[3], // price
                $prod[4], // original_price
                $prod[5], // brand
                $prod[6], // category_id
                $prod[7], // rating
                $prod[8], // review_count
                $isPopular
            ]);
            
            if ($result) {
                $added++;
                echo "✅ " . ($i+1) . ". Добавлен: " . $prod[0] . "<br>";
            }
            
        } catch (Exception $e) {
            echo "⚠️ " . ($i+1) . ". Ошибка: " . $prod[0] . " - " . $e->getMessage() . "<br>";
        }
    }
    
    echo "<br><strong>Результат:</strong><br>";
    echo "📦 Добавлено новых товаров: $added<br>";
    
    // Проверяем финальное количество
    $stmt = $pdo->query("SELECT COUNT(*) as count FROM products");
    $finalCount = $stmt->fetch()['count'];
    echo "📊 Всего товаров теперь: $finalCount<br>";
    
    $stmt = $pdo->query("SELECT COUNT(*) as count FROM products WHERE is_popular = 1");
    $popularCount = $stmt->fetch()['count'];
    echo "⭐ Популярных товаров: $popularCount<br><br>";
    
    echo "<a href='fixed-site.php' style='background: #0891b2; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin-right: 10px;'>Посмотреть сайт</a>";
    echo "<a href='simple-test.php' style='background: #10b981; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;'>Проверить БД</a>";
    
} catch (Exception $e) {
    echo "❌ Ошибка: " . $e->getMessage() . "<br>";
    echo "🔧 Попробуйте проверить настройки базы данных в панели Beget";
}
?>