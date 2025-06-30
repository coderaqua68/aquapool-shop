<?php
// AquaPool Configuration

define('DB_HOST', 'localhost');
define('DB_NAME', 'aquapool_db');
define('DB_USER', 'aquapool_db');
define('DB_PASS', '42892Xxx!');

define('TELEGRAM_BOT_TOKEN', '7550930591:AAHZHqOnklv8EFkID5XaTkgzCrGwhY3Ex7M');
define('TELEGRAM_CHAT_ID', '5696137293');

define('SITE_URL', 'https://aquapool-shop.store');
define('SITE_NAME', 'AquaPool');
define('SITE_DESCRIPTION', 'Интернет-магазин бассейнов и оборудования. 300+ товаров, бесплатная доставка до 31 июля.');

// Error reporting
error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);

// Timezone
date_default_timezone_set('Europe/Moscow');

// Session configuration
ini_set('session.cookie_httponly', 1);
ini_set('session.use_only_cookies', 1);
ini_set('session.cookie_secure', isset($_SERVER['HTTPS']));

// CSRF protection
if (!isset($_SESSION['csrf_token'])) {
    $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
}

function csrf_token() {
    return $_SESSION['csrf_token'];
}

function verify_csrf($token) {
    return isset($_SESSION['csrf_token']) && hash_equals($_SESSION['csrf_token'], $token);
}

// Helper functions
function escape($string) {
    return htmlspecialchars($string, ENT_QUOTES, 'UTF-8');
}

function redirect($url) {
    header("Location: $url");
    exit;
}

function json_response($data, $status = 200) {
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
    exit;
}

function generate_slug($text) {
    $text = mb_strtolower($text, 'UTF-8');
    
    // Транслитерация русских букв
    $transliteration = [
        'а' => 'a', 'б' => 'b', 'в' => 'v', 'г' => 'g', 'д' => 'd',
        'е' => 'e', 'ё' => 'e', 'ж' => 'zh', 'з' => 'z', 'и' => 'i',
        'й' => 'y', 'к' => 'k', 'л' => 'l', 'м' => 'm', 'н' => 'n',
        'о' => 'o', 'п' => 'p', 'р' => 'r', 'с' => 's', 'т' => 't',
        'у' => 'u', 'ф' => 'f', 'х' => 'h', 'ц' => 'ts', 'ч' => 'ch',
        'ш' => 'sh', 'щ' => 'sch', 'ъ' => '', 'ы' => 'y', 'ь' => '',
        'э' => 'e', 'ю' => 'yu', 'я' => 'ya'
    ];
    
    $text = strtr($text, $transliteration);
    $text = preg_replace('/[^a-z0-9\-]/', '-', $text);
    $text = preg_replace('/-+/', '-', $text);
    $text = trim($text, '-');
    
    return $text;
}

function format_price($price) {
    return number_format($price, 0, ',', ' ') . '₽';
}

function whatsapp_link($message = '') {
    $phone = '79000000000'; // Замените на реальный номер
    $encoded_message = urlencode($message);
    return "https://wa.me/{$phone}?text={$encoded_message}";
}
?>