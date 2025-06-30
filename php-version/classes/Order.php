<?php
class Order {
    private $db;
    
    public function __construct() {
        $this->db = Database::getInstance();
    }
    
    public function create($data) {
        try {
            $this->db->beginTransaction();
            
            // Создаем заказ
            $orderData = [
                'customer_name' => $data['customer_name'],
                'customer_phone' => $data['customer_phone'],
                'customer_email' => $data['customer_email'],
                'delivery_address' => $data['delivery_address'],
                'delivery_method' => $data['delivery_method'] ?? 'Курьером до двери',
                'payment_method' => $data['payment_method'] ?? 'Оплата через менеджера',
                'total_amount' => $data['total_amount'],
                'status' => 'new',
                'notes' => $data['notes'] ?? '',
                'created_at' => date('Y-m-d H:i:s')
            ];
            
            $order = $this->db->insert('orders', $orderData);
            
            // Сохраняем товары заказа
            foreach ($data['items'] as $item) {
                $this->db->insert('order_items', [
                    'order_id' => $order['id'],
                    'product_id' => $item['product_id'],
                    'quantity' => $item['quantity'],
                    'price' => $item['price'],
                    'total' => $item['quantity'] * $item['price']
                ]);
            }
            
            $this->db->commit();
            
            // Отправляем уведомление в Telegram
            $this->sendTelegramNotification($order, $data['items']);
            
            return $order;
            
        } catch (Exception $e) {
            $this->db->rollback();
            throw $e;
        }
    }
    
    public function getById($id) {
        $sql = "SELECT o.*, 
                       oi.product_id, oi.quantity, oi.price, oi.total,
                       p.name as product_name, p.sku as product_sku
                FROM orders o
                LEFT JOIN order_items oi ON o.id = oi.order_id
                LEFT JOIN products p ON oi.product_id = p.id
                WHERE o.id = ?";
        
        $results = $this->db->fetchAll($sql, [$id]);
        
        if (empty($results)) {
            return null;
        }
        
        $order = $results[0];
        $order['items'] = [];
        
        foreach ($results as $row) {
            if ($row['product_id']) {
                $order['items'][] = [
                    'product_id' => $row['product_id'],
                    'product_name' => $row['product_name'],
                    'product_sku' => $row['product_sku'],
                    'quantity' => $row['quantity'],
                    'price' => $row['price'],
                    'total' => $row['total']
                ];
            }
        }
        
        return $order;
    }
    
    private function sendTelegramNotification($order, $items) {
        try {
            $message = "🆕 Новый заказ #{$order['id']}\n\n";
            $message .= "👤 Клиент: {$order['customer_name']}\n";
            $message .= "📞 Телефон: {$order['customer_phone']}\n";
            
            if (!empty($order['customer_email'])) {
                $message .= "📧 Email: {$order['customer_email']}\n";
            }
            
            $message .= "🚚 Адрес: {$order['delivery_address']}\n";
            $message .= "💳 Способ оплаты: {$order['payment_method']}\n\n";
            
            $message .= "🛒 Товары:\n";
            foreach ($items as $item) {
                $product = (new Product())->getById($item['product_id']);
                $message .= "• {$product['name']} (SKU: {$product['sku']})\n";
                $message .= "  Количество: {$item['quantity']} шт.\n";
                $message .= "  Цена: " . format_price($item['price']) . "\n\n";
            }
            
            $message .= "💰 Итого: " . format_price($order['total_amount']);
            
            if (!empty($order['notes'])) {
                $message .= "\n\n📝 Комментарий: {$order['notes']}";
            }
            
            $this->sendToTelegram($message);
            
        } catch (Exception $e) {
            error_log("Failed to send Telegram notification: " . $e->getMessage());
        }
    }
    
    private function sendToTelegram($message) {
        $url = "https://api.telegram.org/bot" . TELEGRAM_BOT_TOKEN . "/sendMessage";
        
        $data = [
            'chat_id' => TELEGRAM_CHAT_ID,
            'text' => $message,
            'parse_mode' => 'HTML'
        ];
        
        $options = [
            'http' => [
                'header' => "Content-type: application/x-www-form-urlencoded\r\n",
                'method' => 'POST',
                'content' => http_build_query($data)
            ]
        ];
        
        $context = stream_context_create($options);
        file_get_contents($url, false, $context);
    }
}
?>