<?php
class Product {
    private $pdo;
    
    public function __construct($pdo) {
        $this->pdo = $pdo;
    }
    
    public function getAll($filters = []) {
        $sql = "SELECT p.*, c.name as category_name, c.slug as category_slug 
                FROM products p 
                LEFT JOIN categories c ON p.category_id = c.id 
                WHERE 1=1";
        $params = [];
        
        if (!empty($filters['category'])) {
            // Поддержка родительских категорий
            $category = $this->db->fetch("SELECT * FROM categories WHERE slug = :slug", ['slug' => $filters['category']]);
            if ($category) {
                $subcategories = $this->db->fetchAll("SELECT id FROM categories WHERE parent_id = :parent_id", ['parent_id' => $category['id']]);
                if (!empty($subcategories)) {
                    $categoryIds = array_column($subcategories, 'id');
                    $categoryIds[] = $category['id'];
                    $placeholders = implode(',', array_fill(0, count($categoryIds), '?'));
                    $sql .= " AND p.category_id IN ($placeholders)";
                    $params = array_merge($params, $categoryIds);
                } else {
                    $sql .= " AND p.category_id = ?";
                    $params[] = $category['id'];
                }
            }
        }
        
        if (!empty($filters['search'])) {
            $sql .= " AND (p.name ILIKE ? OR p.sku ILIKE ? OR p.brand ILIKE ? OR p.description ILIKE ?)";
            $searchTerm = '%' . $filters['search'] . '%';
            $params = array_merge($params, [$searchTerm, $searchTerm, $searchTerm, $searchTerm]);
        }
        
        if (!empty($filters['min_price'])) {
            $sql .= " AND p.price >= ?";
            $params[] = $filters['min_price'];
        }
        
        if (!empty($filters['max_price'])) {
            $sql .= " AND p.price <= ?";
            $params[] = $filters['max_price'];
        }
        
        if (!empty($filters['dimensions'])) {
            $sql .= " AND p.specifications::text ILIKE ?";
            $params[] = '%' . $filters['dimensions'] . '%';
        }
        
        // Сортировка
        $sortBy = $filters['sort_by'] ?? 'name';
        switch ($sortBy) {
            case 'price_asc':
                $sql .= " ORDER BY p.price ASC";
                break;
            case 'price_desc':
                $sql .= " ORDER BY p.price DESC";
                break;
            case 'rating':
                $sql .= " ORDER BY p.rating DESC";
                break;
            default:
                $sql .= " ORDER BY p.name ASC";
        }
        
        return $this->db->fetchAll($sql, $params);
    }
    
    public function getById($id) {
        $sql = "SELECT p.*, c.name as category_name, c.slug as category_slug 
                FROM products p 
                LEFT JOIN categories c ON p.category_id = c.id 
                WHERE p.id = ?";
        return $this->db->fetch($sql, [$id]);
    }
    
    public function getBySlug($slug) {
        $sql = "SELECT p.*, c.name as category_name, c.slug as category_slug 
                FROM products p 
                LEFT JOIN categories c ON p.category_id = c.id 
                WHERE p.slug = ?";
        return $this->db->fetch($sql, [$slug]);
    }
    
    public function getPopular($limit = 8) {
        $sql = "SELECT p.*, c.name as category_name, c.slug as category_slug 
                FROM products p 
                LEFT JOIN categories c ON p.category_id = c.id 
                WHERE p.is_popular = true 
                ORDER BY p.rating DESC, p.review_count DESC 
                LIMIT ?";
        return $this->db->fetchAll($sql, [$limit]);
    }
    
    public function getSearchSuggestions($query, $limit = 5) {
        $suggestions = [];
        
        // Поиск по товарам
        $sql = "SELECT name, slug FROM products WHERE name ILIKE ? LIMIT ?";
        $products = $this->db->fetchAll($sql, ['%' . $query . '%', $limit]);
        foreach ($products as $product) {
            $suggestions[] = [
                'type' => 'product',
                'text' => $product['name'],
                'slug' => $product['slug']
            ];
        }
        
        // Поиск по категориям
        $sql = "SELECT name, slug FROM categories WHERE name ILIKE ? LIMIT ?";
        $categories = $this->db->fetchAll($sql, ['%' . $query . '%', $limit]);
        foreach ($categories as $category) {
            $suggestions[] = [
                'type' => 'category',
                'text' => $category['name'],
                'slug' => $category['slug']
            ];
        }
        
        return array_slice($suggestions, 0, $limit);
    }
    
    public function create($data) {
        if (empty($data['slug'])) {
            $data['slug'] = generate_slug($data['name']);
        }
        return $this->db->insert('products', $data);
    }
    
    public function update($id, $data) {
        return $this->db->update('products', $data, 'id = :id', ['id' => $id]);
    }
    
    public function delete($id) {
        $stmt = $this->pdo->prepare("DELETE FROM products WHERE id = ?");
        return $stmt->execute([$id]);
    }
    
    public function getCategoryProductCount($categorySlug) {
        $stmt = $this->pdo->prepare("
            SELECT COUNT(p.id) as count 
            FROM products p 
            JOIN categories c ON p.category_id = c.id 
            WHERE c.slug = ? OR c.parent_slug = ?
        ");
        $stmt->execute([$categorySlug, $categorySlug]);
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        return $result ? $result['count'] : 0;
    }
    
    public function getPopularProducts($limit = 4) {
        $stmt = $this->pdo->prepare("
            SELECT * FROM products 
            WHERE is_popular = 1 
            ORDER BY rating DESC, review_count DESC 
            LIMIT ?
        ");
        $stmt->execute([$limit]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    
    public function getAllProducts($filters = []) {
        $sql = "SELECT p.*, c.name as category_name, c.slug as category_slug 
                FROM products p 
                LEFT JOIN categories c ON p.category_id = c.id 
                WHERE 1=1";
        $params = [];
        
        if (!empty($filters['category'])) {
            $sql .= " AND (c.slug = ? OR c.parent_slug = ?)";
            $params[] = $filters['category'];
            $params[] = $filters['category'];
        }
        
        if (!empty($filters['search'])) {
            $sql .= " AND (p.name LIKE ? OR p.sku LIKE ? OR p.brand LIKE ? OR p.description LIKE ?)";
            $searchTerm = '%' . $filters['search'] . '%';
            $params = array_merge($params, [$searchTerm, $searchTerm, $searchTerm, $searchTerm]);
        }
        
        $sql .= " ORDER BY p.name";
        
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute($params);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    
    public function getCategories() {
        $stmt = $this->pdo->prepare("SELECT * FROM categories ORDER BY name");
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
?>