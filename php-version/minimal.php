<!DOCTYPE html>
<html>
<head>
    <title>AquaPool - Тест</title>
    <meta charset="utf-8">
</head>
<body>
    <h1>AquaPool магазин бассейнов</h1>
    <p>Простая HTML страница работает!</p>
    
    <?php if (extension_loaded('pdo_mysql')): ?>
        <p>✅ MySQL поддержка включена</p>
    <?php else: ?>
        <p>❌ MySQL поддержка отсутствует</p>
    <?php endif; ?>
    
    <p>PHP версия: <?php echo phpversion(); ?></p>
    <p>Время сервера: <?php echo date('Y-m-d H:i:s'); ?></p>
</body>
</html>