<?php
echo "<h1>Диагностика AquaPool</h1>";

echo "<h2>1. PHP информация:</h2>";
echo "PHP версия: " . phpversion() . "<br>";
echo "Время сервера: " . date('Y-m-d H:i:s') . "<br>";

echo "<h2>2. Проверка файлов:</h2>";
$files = ['config.php', 'index.php', '.htaccess', 'classes/Database.php'];
foreach($files as $file) {
    if(file_exists($file)) {
        echo "✅ $file существует<br>";
    } else {
        echo "❌ $file НЕ НАЙДЕН<br>";
    }
}

echo "<h2>3. Проверка папок:</h2>";
$dirs = ['classes', 'pages', 'includes', 'api'];
foreach($dirs as $dir) {
    if(is_dir($dir)) {
        echo "✅ Папка $dir существует<br>";
    } else {
        echo "❌ Папка $dir НЕ НАЙДЕНА<br>";
    }
}

echo "<h2>4. Подключение к базе данных:</h2>";
try {
    $pdo = new PDO(
        'mysql:host=localhost;dbname=aquapool_db;charset=utf8mb4',
        'aquapool_db', 
        '42892Xxx!',
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
    );
    echo "✅ Подключение к БД успешно<br>";
    
    $stmt = $pdo->query("SHOW TABLES");
    $tables = $stmt->fetchAll();
    echo "📊 Таблиц в БД: " . count($tables) . "<br>";
    
} catch(Exception $e) {
    echo "❌ Ошибка БД: " . $e->getMessage() . "<br>";
}

echo "<h2>5. Права доступа:</h2>";
echo "Права на текущую папку: " . substr(sprintf('%o', fileperms('.')), -4) . "<br>";
if(file_exists('config.php')) {
    echo "Права на config.php: " . substr(sprintf('%o', fileperms('config.php')), -4) . "<br>";
}
?>