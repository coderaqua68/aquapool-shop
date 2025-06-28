#!/bin/bash

# Извлекаем артикулы и цены из файла
echo "Извлекаем данные из файла..."

# Создаем временный файл с данными
cat attached_assets/Pasted-1-4-3-1-5--1751133894436_1751133894437.txt | \
grep -A4 "^[0-9]\+\." | \
grep -E "(Название:|Цена до скидки|Цена со скидкой)" | \
sed 's/Название: //g' | \
sed 's/Цена до скидки (минус 25%): //g' | \
sed 's/Цена со скидкой (минус 25%): //g' > /tmp/parsed_data.txt

# Функция извлечения артикула из названия
extract_article() {
    local name="$1"
    echo "$name" | grep -o "арт\. [A-Za-z0-9/]\+" | sed 's/арт\. //g' | head -1
}

# Получаем список всех товаров
echo "Загружаем список товаров из базы..."
PRODUCTS=$(curl -s "http://localhost:5000/api/products")

# Функция поиска товара по артикулу в названии
find_product_by_article() {
    local article="$1"
    echo "$PRODUCTS" | grep -o '"id":[^,]*,"sku":"[^"]*","name":"[^"]*'$article'[^"]*"[^}]*}' | head -1
}

# Функция обновления цены товара
update_product_price() {
    local product_id=$1
    local price=$2
    local original_price=$3
    
    curl -s -X PUT "http://localhost:5000/api/admin/products/$product_id" \
        -H "Content-Type: application/json" \
        -H "Authorization: Basic YWRtaW46YXF1YXBvb2wyMDI1" \
        -d "{\"price\":\"$price\",\"originalPrice\":\"$original_price\"}" > /dev/null
}

# Обрабатываем данные построчно
found_count=0
not_found_count=0
line_counter=0

echo "Начинаем поиск и обновление цен..."
echo ""

while IFS= read -r line; do
    ((line_counter++))
    remainder=$((line_counter % 3))
    
    if [ $remainder -eq 1 ]; then
        # Название товара
        product_name="$line"
        article=$(extract_article "$product_name")
    elif [ $remainder -eq 2 ]; then
        # Цена до скидки
        original_price="$line"
    elif [ $remainder -eq 0 ]; then
        # Цена со скидкой
        sale_price="$line"
        
        if [ -n "$article" ] && [ -n "$original_price" ] && [ -n "$sale_price" ]; then
            echo "Обрабатываем: $(echo "$product_name" | cut -c1-50)..."
            echo "Артикул: $article"
            
            # Ищем товар по артикулу
            product_info=$(find_product_by_article "$article")
            
            if [ -n "$product_info" ]; then
                # Извлекаем ID товара
                product_id=$(echo "$product_info" | grep -o '"id":[^,]*' | cut -d':' -f2)
                
                if [ -n "$product_id" ]; then
                    echo "✓ Найден товар (ID: $product_id)"
                    
                    # Обновляем цены
                    update_product_price "$product_id" "$sale_price" "$original_price"
                    echo "→ Цены обновлены: $sale_price ₽ (было $original_price ₽)"
                    echo ""
                    
                    ((found_count++))
                else
                    echo "✗ Не удалось извлечь ID для артикула $article"
                    ((not_found_count++))
                fi
            else
                echo "✗ Товар не найден: артикул $article"
                ((not_found_count++))
            fi
        else
            echo "✗ Неполные данные для товара"
            ((not_found_count++))
        fi
        
        # Сброс переменных
        product_name=""
        article=""
        original_price=""
        sale_price=""
        
        # Небольшая пауза
        sleep 0.1
    fi
done < /tmp/parsed_data.txt

echo "==============================================="
echo "ИТОГИ ОБНОВЛЕНИЯ:"
echo "Найдено и обновлено: $found_count"
echo "Не найдено: $not_found_count"
echo "==============================================="

# Удаляем временный файл
rm -f /tmp/parsed_data.txt