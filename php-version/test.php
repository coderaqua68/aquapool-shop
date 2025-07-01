<?php
echo "<h2>🔧 Простой тест AquaPool</h2>";
echo "<p>PHP работает!</p>";

// Проверяем подключение к БД
try {
    $pdo = new PDO(
        'mysql:host=localhost;dbname=aquapool_db;charset=utf8mb4',
        'aquapool_db',
        '42892Xxx!',
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8mb4"
        ]
    );
    
    echo "<p>✅ <strong>Подключение к БД успешно!</strong></p>";
    
    // Проверяем таблицы
    $stmt = $pdo->query("SHOW TABLES");
    $tables = $stmt->fetchAll();
    echo "<p>📊 Найдено таблиц: " . count($tables) . "</p>";
    
    foreach($tables as $table) {
        $tableName = array_values($table)[0];
        $stmt = $pdo->query("SELECT COUNT(*) as count FROM `$tableName`");
        $count = $stmt->fetch();
        echo "<p>• $tableName: " . $count['count'] . " записей</p>";
    }
    
    echo "<p><strong style='color: green;'>🎉 Сайт готов к работе!</strong></p>";
    
} catch (Exception $e) {
    echo "<p>❌ <strong style='color: red;'>Ошибка подключения:</strong></p>";
    echo "<p>" . $e->getMessage() . "</p>";
}
?>