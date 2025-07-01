<?php
echo "<h2>Тест подключения к базе данных</h2>";

try {
    $pdo = new PDO(
        'mysql:host=localhost;dbname=aquapool_db;charset=utf8mb4',
        'aquapool_db',
        '42892Xxx!',
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
        ]
    );
    
    echo "✅ Подключение к БД успешно!<br>";
    
    // Проверяем таблицы
    $stmt = $pdo->query("SHOW TABLES");
    $tables = $stmt->fetchAll();
    echo "📊 Найдено таблиц: " . count($tables) . "<br>";
    
    foreach($tables as $table) {
        $tableName = array_values($table)[0];
        $stmt = $pdo->query("SELECT COUNT(*) as count FROM `$tableName`");
        $count = $stmt->fetch();
        echo "• $tableName: " . $count['count'] . " записей<br>";
    }
    
} catch (Exception $e) {
    echo "❌ Ошибка подключения: " . $e->getMessage();
}
?>