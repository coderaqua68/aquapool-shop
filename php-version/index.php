<?php
session_start();
require_once 'config.php';

// Simple router
$request_uri = $_SERVER['REQUEST_URI'];
$path = parse_url($request_uri, PHP_URL_PATH);
$query = parse_url($request_uri, PHP_URL_QUERY);

// API routes
if (strpos($path, '/api/') === 0) {
    header('Content-Type: application/json');
    require_once 'api/router.php';
    exit;
}

// Admin routes
if (strpos($path, '/admin') === 0) {
    require_once 'admin/index.php';
    exit;
}

// Product page routes
if (preg_match('/^\/product\/(.+)$/', $path, $matches)) {
    $slug = $matches[1];
    require_once 'pages/product.php';
    exit;
}

// Category page routes
if (preg_match('/^\/category\/(.+)$/', $path, $matches)) {
    $slug = $matches[1];
    require_once 'pages/category.php';
    exit;
}

// Other pages
switch ($path) {
    case '/':
        require_once 'pages/home.php';
        break;
    case '/catalog':
        require_once 'pages/catalog.php';
        break;
    case '/cart':
        require_once 'pages/cart.php';
        break;
    case '/checkout':
        require_once 'pages/checkout.php';
        break;
    case '/search':
        require_once 'pages/search.php';
        break;
    case '/delivery':
        require_once 'pages/delivery.php';
        break;
    case '/contact':
        require_once 'pages/contact.php';
        break;
    case '/about':
        require_once 'pages/about.php';
        break;
    case '/privacy-policy':
        require_once 'pages/privacy.php';
        break;
    case '/favorites':
        require_once 'pages/favorites.php';
        break;
    default:
        http_response_code(404);
        require_once 'pages/404.php';
        break;
}
?>