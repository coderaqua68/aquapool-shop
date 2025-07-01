<?php
require_once '../config.php';
require_once '../classes/Database.php';
require_once '../classes/Product.php';
require_once '../classes/Category.php';
require_once '../classes/Order.php';

// CORS headers
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

$method = $_SERVER['REQUEST_METHOD'];
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$pathParts = explode('/', trim($path, '/'));

// Remove 'api' from path parts
if ($pathParts[0] === 'api') {
    array_shift($pathParts);
}

$endpoint = $pathParts[0] ?? '';
$param = $pathParts[1] ?? '';
$subParam = $pathParts[2] ?? '';

try {
    switch ($endpoint) {
        case 'products':
            handleProducts($method, $param, $subParam);
            break;
            
        case 'categories':
            handleCategories($method, $param, $subParam);
            break;
            
        case 'orders':
            handleOrders($method, $param);
            break;
            
        case 'search':
            handleSearch($method);
            break;
            
        case 'suggestions':
            handleSuggestions($method);
            break;
            
        default:
            json_response(['error' => 'Endpoint not found'], 404);
    }
} catch (Exception $e) {
    error_log("API Error: " . $e->getMessage());
    json_response(['error' => 'Internal server error'], 500);
}

function handleProducts($method, $param, $subParam) {
    $productModel = new Product();
    
    switch ($method) {
        case 'GET':
            if ($param === 'popular') {
                $products = $productModel->getPopular();
                json_response($products);
            } elseif ($param) {
                // Get single product by slug or ID
                if (is_numeric($param)) {
                    $product = $productModel->getById($param);
                } else {
                    $product = $productModel->getBySlug($param);
                }
                
                if ($product) {
                    json_response($product);
                } else {
                    json_response(['error' => 'Product not found'], 404);
                }
            } else {
                // Get all products with filters
                $filters = [
                    'category' => $_GET['category'] ?? '',
                    'search' => $_GET['search'] ?? '',
                    'min_price' => $_GET['min_price'] ?? '',
                    'max_price' => $_GET['max_price'] ?? '',
                    'dimensions' => $_GET['dimensions'] ?? '',
                    'sort_by' => $_GET['sort_by'] ?? 'name'
                ];
                
                $products = $productModel->getAll($filters);
                json_response($products);
            }
            break;
            
        case 'POST':
            $data = json_decode(file_get_contents('php://input'), true);
            $product = $productModel->create($data);
            json_response($product, 201);
            break;
            
        case 'PUT':
            if ($param) {
                $data = json_decode(file_get_contents('php://input'), true);
                $product = $productModel->update($param, $data);
                json_response($product);
            }
            break;
            
        case 'DELETE':
            if ($param) {
                $result = $productModel->delete($param);
                json_response(['success' => $result]);
            }
            break;
    }
}

function handleCategories($method, $param, $subParam) {
    $categoryModel = new Category();
    
    switch ($method) {
        case 'GET':
            if ($param === 'main') {
                $categories = $categoryModel->getMain();
                json_response($categories);
            } elseif ($param && $subParam === 'stats') {
                $stats = $categoryModel->getStats($param);
                if ($stats) {
                    json_response($stats);
                } else {
                    json_response(['error' => 'Category not found'], 404);
                }
            } elseif ($param) {
                $category = $categoryModel->getBySlug($param);
                if ($category) {
                    json_response($category);
                } else {
                    json_response(['error' => 'Category not found'], 404);
                }
            } else {
                $categories = $categoryModel->getAll();
                json_response($categories);
            }
            break;
    }
}

function handleOrders($method, $param) {
    $orderModel = new Order();
    
    switch ($method) {
        case 'POST':
            $data = json_decode(file_get_contents('php://input'), true);
            
            // Validate required fields
            if (empty($data['customer_name']) || empty($data['customer_phone']) || empty($data['items'])) {
                json_response(['error' => 'Missing required fields'], 400);
            }
            
            $order = $orderModel->create($data);
            json_response($order, 201);
            break;
            
        case 'GET':
            if ($param) {
                $order = $orderModel->getById($param);
                if ($order) {
                    json_response($order);
                } else {
                    json_response(['error' => 'Order not found'], 404);
                }
            }
            break;
    }
}

function handleSearch($method) {
    if ($method !== 'GET') {
        json_response(['error' => 'Method not allowed'], 405);
    }
    
    $query = $_GET['q'] ?? '';
    if (empty($query)) {
        json_response([]);
    }
    
    $productModel = new Product();
    $results = $productModel->getAll(['search' => $query]);
    json_response($results);
}

function handleSuggestions($method) {
    if ($method !== 'GET') {
        json_response(['error' => 'Method not allowed'], 405);
    }
    
    $query = $_GET['q'] ?? '';
    if (empty($query) || strlen($query) < 2) {
        json_response([]);
    }
    
    $productModel = new Product();
    $suggestions = $productModel->getSearchSuggestions($query);
    json_response($suggestions);
}
?>