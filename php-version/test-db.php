<?php
require_once 'config.php';
require_once 'classes/Database.php';

echo "<h2>🔧 Тест подключения AquaPool</h2>";

try {
    $db = new Database();
    echo "✅ <strong>Подключение к БД успешно!</strong><br>";
    
    // Проверяем таблицы
    $tables = $db->query("SHOW TABLES")->fetchAll();
    echo "📊 Найдено таблиц: " . count($tables) . "<br>";
    
    foreach($tables as $table) {
        $tableName = array_values($table)[0];
        $count = $db->query("SELECT COUNT(*) as count FROM `$tableName`")->fetch();
        echo "• $tableName: " . $count['count'] . " записей<br>";
    }
    
    // Проверяем товары
    $products = $db->query("SELECT COUNT(*) as count FROM products")->fetch();
    echo "<br>🛍️ <strong>Товаров в каталоге: " . $products['count'] . "</strong><br>";
    
    // Проверяем категории  
    $categories = $db->query("SELECT COUNT(*) as count FROM categories")->fetch();
    echo "📂 <strong>Категорий: " . $categories['count'] . "</strong><br>";
    
    echo "<br>🎉 <strong style='color: green;'>Сайт готов к работе!</strong>";
    
} catch (Exception $e) {
    echo "❌ <strong style='color: red;'>Ошибка подключения:</strong><br>";
    echo $e->getMessage();
    echo "<br><br>📝 <strong>Проверьте:</strong><br>";
    echo "• Правильность данных в config.php<br>";
    echo "• Импорт database.sql и import-data.sql<br>";
    echo "• Права доступа к базе данных<br>";
}
?>