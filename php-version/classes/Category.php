<?php
class Category {
    private $db;
    
    public function __construct() {
        $this->db = Database::getInstance();
    }
    
    public function getAll() {
        $sql = "SELECT c.*, 
                       COUNT(p.id) as product_count,
                       MIN(p.price) as min_price
                FROM categories c 
                LEFT JOIN products p ON p.category_id = c.id 
                GROUP BY c.id 
                ORDER BY c.sort_order ASC, c.name ASC";
        return $this->db->fetchAll($sql);
    }
    
    public function getMain() {
        $sql = "SELECT c.*, 
                       COUNT(p.id) as product_count,
                       MIN(p.price) as min_price
                FROM categories c 
                LEFT JOIN products p ON p.category_id = c.id 
                WHERE c.parent_id IS NULL 
                GROUP BY c.id 
                ORDER BY c.sort_order ASC, c.name ASC";
        return $this->db->fetchAll($sql);
    }
    
    public function getBySlug($slug) {
        $sql = "SELECT * FROM categories WHERE slug = ?";
        return $this->db->fetch($sql, [$slug]);
    }
    
    public function getStats($categorySlug) {
        $category = $this->getBySlug($categorySlug);
        if (!$category) {
            return null;
        }
        
        // Получаем подкатегории
        $subcategories = $this->db->fetchAll("SELECT id FROM categories WHERE parent_id = ?", [$category['id']]);
        
        if (!empty($subcategories)) {
            // Если есть подкатегории, считаем товары во всех подкатегориях
            $categoryIds = array_column($subcategories, 'id');
            $categoryIds[] = $category['id'];
            $placeholders = implode(',', array_fill(0, count($categoryIds), '?'));
            $sql = "SELECT COUNT(*) as count, MIN(price) as min_price FROM products WHERE category_id IN ($placeholders)";
            $result = $this->db->fetch($sql, $categoryIds);
        } else {
            // Если подкатегорий нет, считаем только в данной категории
            $sql = "SELECT COUNT(*) as count, MIN(price) as min_price FROM products WHERE category_id = ?";
            $result = $this->db->fetch($sql, [$category['id']]);
        }
        
        return [
            'count' => (int)$result['count'],
            'minPrice' => (int)$result['min_price']
        ];
    }
    
    public function getSubcategories($parentId) {
        $sql = "SELECT c.*, 
                       COUNT(p.id) as product_count
                FROM categories c 
                LEFT JOIN products p ON p.category_id = c.id 
                WHERE c.parent_id = ? 
                GROUP BY c.id 
                ORDER BY c.sort_order ASC, c.name ASC";
        return $this->db->fetchAll($sql, [$parentId]);
    }
    
    public function create($data) {
        if (empty($data['slug'])) {
            $data['slug'] = generate_slug($data['name']);
        }
        return $this->db->insert('categories', $data);
    }
    
    public function update($id, $data) {
        return $this->db->update('categories', $data, 'id = :id', ['id' => $id]);
    }
    
    public function delete($id) {
        return $this->db->delete('categories', 'id = ?', [$id]);
    }
}
?>