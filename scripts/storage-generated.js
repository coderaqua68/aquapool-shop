// Полный каталог товаров (332 позиций)
const categoriesData = [
  {
    "name": "Каркасные бассейны",
    "slug": "frame-pools",
    "description": "Прочные каркасные бассейны для дачи"
  },
  {
    "name": "Надувные бассейны",
    "slug": "inflatable-pools",
    "description": "Быстро устанавливаемые надувные бассейны"
  },
  {
    "name": "Насосы и фильтры",
    "slug": "pumps-filters",
    "description": "Системы очистки и циркуляции воды"
  },
  {
    "name": "Лестницы",
    "slug": "ladders",
    "description": "Безопасные лестницы для бассейнов"
  },
  {
    "name": "Тенты и подстилки",
    "slug": "covers-underlays",
    "description": "Защитные покрытия и основания"
  },
  {
    "name": "Химия для бассейнов",
    "slug": "chemicals",
    "description": "Средства для очистки и дезинфекции воды"
  },
  {
    "name": "Аксессуары",
    "slug": "accessories",
    "description": "Дополнительные принадлежности"
  }
];

const productsData = [
  {
    "name": "Чаша каркасного бассейна 366*122см",
    "description": "Качественный товар для бассейна от проверенного производителя.",
    "price": "9960",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/5dd/5ddf4e93cf633b24ebb542708d0d2074.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/5dd/5ddf4e93cf633b24ebb542708d0d2074.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.3",
    "reviewCount": 10
  },
  {
    "name": "Чаша каркасного бассейна 366*122см",
    "description": "Качественный товар для бассейна от проверенного производителя.",
    "price": "9960",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/c38/c3862118045268d0c64043f822211af5.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/c38/c3862118045268d0c64043f822211af5.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.2",
    "reviewCount": 19
  },
  {
    "name": "Чаша круглая для бассейна 200 х 140 см, 0.4/0.4 мм. Мрамор",
    "description": "Качественный товар для бассейна от проверенного производителя.",
    "price": "10000",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/dcd/od6z2e9i42yt95390u4f4uo0c0ibe6yx.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/dcd/od6z2e9i42yt95390u4f4uo0c0ibe6yx.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.4",
    "reviewCount": 44
  },
  {
    "name": "Чаша круглая для бассейна 200 х 140 см, 0.4/0.4 мм. Голубая",
    "description": "Качественный товар для бассейна от проверенного производителя.",
    "price": "10000",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/e2e/cv61bxw5jib0p1wb2xny1pvuttz4cbvy.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/e2e/cv61bxw5jib0p1wb2xny1pvuttz4cbvy.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.3",
    "reviewCount": 26
  },
  {
    "name": "Чаша для каркасного бассейна см, Metal Frame Pool",
    "description": "Вес упаковки (кг): 19.83 Страна производства: КИТАЙ Объем упаковки (м3): 0.08",
    "price": "10120",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/2cd/2cd7cecde7aae5bac77fcf90b5742a50.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/2cd/2cd7cecde7aae5bac77fcf90b5742a50.jpg"
    ],
    "specifications": "{\"Вес упаковки (кг)\":\"19.83\",\"Страна производства\":\"КИТАЙ\",\"Объем упаковки (м3)\":\"0.08\"}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.2",
    "reviewCount": 12
  },
  {
    "name": "Чаша 610х366х122см для овального бассейна Fast Set",
    "description": "Вес упаковки (кг): 37.48 Страна производства: КИТАЙ Объем упаковки (м3): 0.124",
    "price": "10680",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "bestway",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/994/994040c229b2d08985e233484b1dda5f.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/994/994040c229b2d08985e233484b1dda5f.jpg"
    ],
    "specifications": "{\"Вес упаковки (кг)\":\"37.48\",\"Страна производства\":\"КИТАЙ\",\"Объем упаковки (м3)\":\"0.124\"}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.7",
    "reviewCount": 23
  },
  {
    "name": "Чаша 610х366х122см для овального бассейна Fast Set",
    "description": "Вес упаковки (кг): 36.7 Страна производства: КИТАЙ Объем упаковки (м3): 0.124",
    "price": "10680",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "bestway",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/748/7484f54c61b6b193aca3991e718f65e8.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/748/7484f54c61b6b193aca3991e718f65e8.jpg"
    ],
    "specifications": "{\"Вес упаковки (кг)\":\"36.7\",\"Страна производства\":\"КИТАЙ\",\"Объем упаковки (м3)\":\"0.124\"}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.6",
    "reviewCount": 22
  },
  {
    "name": "Чаша 488х305х107см для овального бассейна Steel Pro",
    "description": "Вес упаковки (кг): 30.01 Форма бассейна: Овальный Страна производства: КИТАЙ Длина/Диаметр, см: 488 Ширина, см: 305 Высота, см: 107 Объем упаковки (м3): 0.147Чаша для круглого овального бассейна Steel Pro 488х305х107см. Выполнена из высококачественного трехслойного ПВХ: два слоя винила и внешний слой высокопрочный полиэстер. Отличается высокой прочностью, не подвержена растягиванию, истиранию, воздействию ультрафиолета. Чаша оборудована всем необходимым для подключения систем фильтрации, а также...",
    "price": "10680",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "bestway",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/b0c/b0ca2fc2b64f3066c35faf576fec8e9c.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/b0c/b0ca2fc2b64f3066c35faf576fec8e9c.jpg",
      "https://basseyn.ru/upload/iblock/d3b/d3b68b772bbe805b95bc8129da31fc1b.jpg"
    ],
    "specifications": "{\"Вес упаковки (кг)\":\"30.01\",\"Форма бассейна\":\"Овальный\",\"Страна производства\":\"КИТАЙ\",\"Длина/Диаметр, см\":\"488\",\"Ширина, см\":\"305\",\"Высота, см\":\"107\",\"Объем упаковки (м3)\":\"0.147\"}",
    "inStock": true,
    "isPopular": true,
    "isNew": false,
    "discount": 0,
    "rating": "4.6",
    "reviewCount": 47
  },
  {
    "name": "Чаша для овального бассейна Steel Pro 549х366х122 см, 15033 л",
    "description": "Вес упаковки (кг): 0 Страна производства: КИТАЙ Объем упаковки (м3): 0",
    "price": "10690",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "bestway",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/c55/c5544809e97ea7c2cdbe8ae6d2c918ee.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/c55/c5544809e97ea7c2cdbe8ae6d2c918ee.jpg"
    ],
    "specifications": "{\"Вес упаковки (кг)\":\"0\",\"Страна производства\":\"КИТАЙ\",\"Объем упаковки (м3)\":\"0\"}",
    "inStock": true,
    "isPopular": true,
    "isNew": false,
    "discount": 0,
    "rating": "4.5",
    "reviewCount": 17
  },
  {
    "name": "Чаша для бассейна 488x107см, Easy Set Pool",
    "description": "Вес упаковки (кг): 25 Страна производства: КИТАЙ Объем упаковки (м3): 0.108",
    "price": "10930",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/d3b/d3b79ca6b01fffad7d8ad6c4563bd628.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/d3b/d3b79ca6b01fffad7d8ad6c4563bd628.jpg"
    ],
    "specifications": "{\"Вес упаковки (кг)\":\"25\",\"Страна производства\":\"КИТАЙ\",\"Объем упаковки (м3)\":\"0.108\",\"Диаметр\":\"488 см\",\"Высота\":\"107 см\"}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.4",
    "reviewCount": 38
  },
  {
    "name": "Чаша для каркасного бассейна 457x107см, Metal Frame Pool",
    "description": "Вес упаковки (кг): 19.83 Страна производства: КИТАЙ Объем упаковки (м3): 0.081",
    "price": "10990",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/a1d/a1d1bd1754f46930088740d3ac274902.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/a1d/a1d1bd1754f46930088740d3ac274902.jpg"
    ],
    "specifications": "{\"Вес упаковки (кг)\":\"19.83\",\"Страна производства\":\"КИТАЙ\",\"Объем упаковки (м3)\":\"0.081\",\"Диаметр\":\"457 см\",\"Высота\":\"107 см\"}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.6",
    "reviewCount": 51
  },
  {
    "name": "Чаша 360*90см, для бассейна со стальными стенками Hydrium Splasher",
    "description": "Качественный товар для бассейна от проверенного производителя.",
    "price": "11160",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/bd0/bd0ac572a700de56279f8aa3d0c1612d.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/bd0/bd0ac572a700de56279f8aa3d0c1612d.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.8",
    "reviewCount": 10
  },
  {
    "name": "Каркасный бассейн 366х91см с фильтр-насосом",
    "description": "Форма бассейна: Круглый Тип фильтр-насоса: Картриджный насос Длина/Диаметр, см: 366 Высота, см: 91 Время установки, мин: 45",
    "price": "11750",
    "originalPrice": null,
    "category": "frame-pools",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/340/kf65qcpbl28j0ajpoe5ps661hz1atqiu.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/340/kf65qcpbl28j0ajpoe5ps661hz1atqiu.jpg"
    ],
    "specifications": "{\"Форма бассейна\":\"Круглый\",\"Тип фильтр-насоса\":\"Картриджный насос\",\"Длина/Диаметр, см\":\"366\",\"Высота, см\":\"91\",\"Время установки, мин\":\"45\"}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.3",
    "reviewCount": 49
  },
  {
    "name": "Каркасный бассейн 305х76см с фильтр-насосом",
    "description": "Форма бассейна: Круглый Тип фильтр-насоса: Картриджный насос Длина/Диаметр, см: 305 Высота, см: 76 Время установки, мин: 45",
    "price": "11990",
    "originalPrice": null,
    "category": "frame-pools",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/67a/gw3x91roip17z5w003k030j6imw00jtq.webp",
    "images": [
      "https://basseyn.ru/upload/iblock/67a/gw3x91roip17z5w003k030j6imw00jtq.webp"
    ],
    "specifications": "{\"Форма бассейна\":\"Круглый\",\"Тип фильтр-насоса\":\"Картриджный насос\",\"Длина/Диаметр, см\":\"305\",\"Высота, см\":\"76\",\"Время установки, мин\":\"45\"}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.3",
    "reviewCount": 26
  },
  {
    "name": "Чаша для каркасного бассейна 427x122см, Metal Frame Pool",
    "description": "Вес упаковки (кг): 0 Форма бассейна: Круглый Страна производства: КИТАЙ Длина/Диаметр, см: 427 Высота, см: 122 Объем упаковки (м3): 0Чаша для круглого бассейна Metal Frame Pool 427x122см. Выполнена из высококачественного трехслойного ПВХ: два слоя винила и внешний слой высокопрочный полиэстер. Отличается высокой прочностью, не подвержена растягиванию, истиранию, воздействию ультрафиолета. Чаша оборудована всем необходимым для подключения систем фильтрации, а также имеет сливной клапан....",
    "price": "12020",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "intex",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/4dd/4ddd7285c800bb200c7d95d929d7362e.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/4dd/4ddd7285c800bb200c7d95d929d7362e.jpg",
      "https://basseyn.ru/upload/iblock/6ee/6eefbae1510cc7122437a23008e17190.jpg",
      "https://basseyn.ru/upload/iblock/882/882eed471cb76b8b6168c4f612fa1b65.jpg"
    ],
    "specifications": "{\"Вес упаковки (кг)\":\"0\",\"Форма бассейна\":\"Круглый\",\"Страна производства\":\"КИТАЙ\",\"Длина/Диаметр, см\":\"427\",\"Высота, см\":\"122\",\"Объем упаковки (м3)\":\"0\",\"Диаметр\":\"427 см\",\"Высота\":\"122 см\"}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.8",
    "reviewCount": 25
  },
  {
    "name": "Каркасный бассейн 305х100см, 6148л",
    "description": "Качественный товар для бассейна от проверенного производителя.",
    "price": "12080",
    "originalPrice": null,
    "category": "frame-pools",
    "subcategory": "",
    "brand": "Другие",
    "volume": "6148л",
    "imageUrl": "https://basseyn.ru/upload/iblock/dad/12h2dlmc91oli6le4ccudzfq5n2s6tnv.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/dad/12h2dlmc91oli6le4ccudzfq5n2s6tnv.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.2",
    "reviewCount": 40
  },
  {
    "name": "Чаша круглая для бассейна 244 х 140 см. 0.4/0.4 мм. Голубая",
    "description": "Качественный товар для бассейна от проверенного производителя.",
    "price": "12400",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/e8e/rln2hyessncoo2dl2kvieci5fhdntw29.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/e8e/rln2hyessncoo2dl2kvieci5fhdntw29.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.0",
    "reviewCount": 12
  },
  {
    "name": "Чаша круглая для бассейна 200 х 140 см, 0.6/0.6 мм. Голубая",
    "description": "Качественный товар для бассейна от проверенного производителя.",
    "price": "12400",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/5f0/30iwl64zyki1prw6bf20bdgvbikkcv4l.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/5f0/30iwl64zyki1prw6bf20bdgvbikkcv4l.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.9",
    "reviewCount": 41
  },
  {
    "name": "Чаша круглая для бассейна 244 х 140 см, 0.25/0.4mm Patterned Liner 85058",
    "description": "Цвет материала Patterned Liner 85058, толщина стенки 0,4 мм, толщина дна 0,4 мм",
    "price": "12400",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/a82/a8211ee471b6b48aa1b96dee3d1d7ef4.PNG",
    "images": [
      "https://basseyn.ru/upload/iblock/a82/a8211ee471b6b48aa1b96dee3d1d7ef4.PNG"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.2",
    "reviewCount": 42
  },
  {
    "name": "Чаша 427x107см для каркасного бассейна Steel Pro",
    "description": "Качественный товар для бассейна от проверенного производителя.",
    "price": "12470",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "bestway",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/9a3/qnxrj327uza1iedu69wvoc3nazycur2l.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/9a3/qnxrj327uza1iedu69wvoc3nazycur2l.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": true,
    "isNew": false,
    "discount": 0,
    "rating": "4.4",
    "reviewCount": 43
  },
  {
    "name": "Чаша 457*122см, для каркасного бассейна Steel Pro MAX",
    "description": "Качественный товар для бассейна от проверенного производителя.",
    "price": "12470",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/5cd/5cdd6ff227ff77763b2e7c6e495c205b.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/5cd/5cdd6ff227ff77763b2e7c6e495c205b.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": true,
    "isNew": false,
    "discount": 0,
    "rating": "4.9",
    "reviewCount": 25
  },
  {
    "name": "Чаша овальная для бассейна 300 х 200 х 140 см. 0.4/0.4 мм. Мрамор",
    "description": "Качественный товар для бассейна от проверенного производителя.",
    "price": "12800",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/376/wjfydbi4tkgievoyxcfvxfwfv44guwjs.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/376/wjfydbi4tkgievoyxcfvxfwfv44guwjs.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.8",
    "reviewCount": 44
  },
  {
    "name": "Чаша для овального бассейна Steel Pro 549х366х122 см, 15033 л",
    "description": "Вес упаковки (кг): 0 Страна производства: КИТАЙ Объем упаковки (м3): 0",
    "price": "12830",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "bestway",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/02f/02fe4bc6fa4d5396958af6bf9dd71c1f.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/02f/02fe4bc6fa4d5396958af6bf9dd71c1f.jpg"
    ],
    "specifications": "{\"Вес упаковки (кг)\":\"0\",\"Страна производства\":\"КИТАЙ\",\"Объем упаковки (м3)\":\"0\"}",
    "inStock": true,
    "isPopular": true,
    "isNew": false,
    "discount": 0,
    "rating": "4.9",
    "reviewCount": 38
  },
  {
    "name": "Чаша 404х201х100см для прямоугольного каркасного бассейна",
    "description": "Качественный товар для бассейна от проверенного производителя.",
    "price": "12880",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "bestway",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/d36/qujw4cvvve9culenk9sc1qg02tw07uzg.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/d36/qujw4cvvve9culenk9sc1qg02tw07uzg.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.1",
    "reviewCount": 48
  },
  {
    "name": "Чаша 460*90см, для бассейна со стальными стенками Hydrium Splasher",
    "description": "Качественный товар для бассейна от проверенного производителя.",
    "price": "13040",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/748/748f22a47a89e91a15de6c3800334d5d.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/748/748f22a47a89e91a15de6c3800334d5d.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.8",
    "reviewCount": 53
  },
  {
    "name": "Чаша 196*61см, для бассейна LAY-Z-SPA Vegas",
    "description": "Качественный товар для бассейна от проверенного производителя.",
    "price": "13040",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/237/237693245f8bac7113749712c2606c35.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/237/237693245f8bac7113749712c2606c35.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.6",
    "reviewCount": 10
  },
  {
    "name": "Чаша 366x122см для каркасного бассейна Steel Pro",
    "description": "Качественный товар для бассейна от проверенного производителя.",
    "price": "13120",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "bestway",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/256/r1ehpmyrv2eoeuzdpodzib0rfft6bymv.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/256/r1ehpmyrv2eoeuzdpodzib0rfft6bymv.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": true,
    "isNew": false,
    "discount": 0,
    "rating": "4.6",
    "reviewCount": 6
  },
  {
    "name": "Чаша 300*120см, для бассейна со стальными стенками Hydrium",
    "description": "Качественный товар для бассейна от проверенного производителя.",
    "price": "13170",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/91d/91d72c681b12b8f0d37145651349ed4e.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/91d/91d72c681b12b8f0d37145651349ed4e.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.2",
    "reviewCount": 46
  },
  {
    "name": "Чаша 300х120см, для бассейна со стальными стенками Hydrium",
    "description": "Качественный товар для бассейна от проверенного производителя.",
    "price": "13280",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "bestway",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/4dd/wvd30lcfme9j64w0rwpm2l9pmfazx2b6.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/4dd/wvd30lcfme9j64w0rwpm2l9pmfazx2b6.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.9",
    "reviewCount": 21
  },
  {
    "name": "Каркасный бассейн 366x201x66см, фильтр-насос",
    "description": "Форма бассейна: Прямоугольный Тип фильтр-насоса: Картриджный насос Длина/Диаметр, см: 366 Ширина, см: 201 Высота, см: 66 Время установки, мин: 45",
    "price": "13280",
    "originalPrice": null,
    "category": "frame-pools",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/resize_cache/iblock/670/1500_1500_1/c1epb2y1k2d6k5apphhui6223mrg601q.jpg",
    "images": [
      "https://basseyn.ru/upload/resize_cache/iblock/670/1500_1500_1/c1epb2y1k2d6k5apphhui6223mrg601q.jpg",
      "https://basseyn.ru/upload/resize_cache/iblock/c7b/1500_1500_1/uia4r2tg1iw6zjmx11vc9syasx8edg4w.jpg",
      "https://basseyn.ru/upload/resize_cache/iblock/e07/1500_1500_1/la13ko9vp3xgtxd3wf5r7wwy8wvac80q.jpg",
      "https://basseyn.ru/upload/resize_cache/iblock/148/1500_1500_1/475ng82omgyc607elob0ygus13hdm7jy.jpg"
    ],
    "specifications": "{\"Форма бассейна\":\"Прямоугольный\",\"Тип фильтр-насоса\":\"Картриджный насос\",\"Длина/Диаметр, см\":\"366\",\"Ширина, см\":\"201\",\"Высота, см\":\"66\",\"Время установки, мин\":\"45\",\"Размер\":\"366x201x66 см\"}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.2",
    "reviewCount": 13
  },
  {
    "name": "Каркасный бассейн 366x132см, 10250л, фил.-насос 3785л/ч",
    "description": "Вес упаковки (кг): 45,71 Форма бассейна: Круглый Вес товара: 43 Страна производства: КИТАЙ Тип фильтр-насоса: Картриджный насос Производительность фильтра л/ч: 3785 Объем, л: 10250 Длина/Диаметр, см: 366 Высота, см: 132 Время установки, мин: 45",
    "price": "13310",
    "originalPrice": null,
    "category": "frame-pools",
    "subcategory": "summer-escapes-polygroup",
    "brand": "Другие",
    "volume": "10250л",
    "imageUrl": "https://basseyn.ru/upload/iblock/016/016a10898e248b0fb0f77e5490120896.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/016/016a10898e248b0fb0f77e5490120896.jpg"
    ],
    "specifications": "{\"Вес упаковки (кг)\":\"45,71\",\"Форма бассейна\":\"Круглый\",\"Вес товара\":\"43\",\"Страна производства\":\"КИТАЙ\",\"Тип фильтр-насоса\":\"Картриджный насос\",\"Производительность фильтра л/ч\":\"3785\",\"Объем, л\":\"10250\",\"Длина/Диаметр, см\":\"366\",\"Высота, см\":\"132\",\"Время установки, мин\":\"45\",\"Диаметр\":\"366 см\",\"Высота\":\"132 см\",\"Объем\":\"10250 л\"}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.8",
    "reviewCount": 43
  },
  {
    "name": "Чаша 610х366х122cм для овального бассейна Steel Pro",
    "description": "Вес упаковки (кг): 36.32 Форма бассейна: Овальный Страна производства: КИТАЙ Длина/Диаметр, см: 610 Ширина, см: 366 Высота, см: 122 Объем упаковки (м3): 0.139Чаша для круглого овального бассейна Steel Pro 610х366х122cм. Выполнена из высококачественного трехслойного ПВХ: два слоя винила и внешний слой высокопрочный полиэстер. Отличается высокой прочностью, не подвержена растягиванию, истиранию, воздействию ультрафиолета. Чаша оборудована всем необходимым для подключения систем фильтрации, а также...",
    "price": "13350",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "bestway",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/cea/cea3bcea59c5ec01dbb5a3f6993384e8.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/cea/cea3bcea59c5ec01dbb5a3f6993384e8.jpg",
      "https://basseyn.ru/upload/iblock/8d4/8d4ecd36d7e129dee34004025f0a7fb4.jpg"
    ],
    "specifications": "{\"Вес упаковки (кг)\":\"36.32\",\"Форма бассейна\":\"Овальный\",\"Страна производства\":\"КИТАЙ\",\"Длина/Диаметр, см\":\"610\",\"Ширина, см\":\"366\",\"Высота, см\":\"122\",\"Объем упаковки (м3)\":\"0.139\"}",
    "inStock": true,
    "isPopular": true,
    "isNew": false,
    "discount": 0,
    "rating": "4.8",
    "reviewCount": 25
  },
  {
    "name": "Чаша для каркасного бассейна см, Metal Frame Pool",
    "description": "Вес упаковки (кг): 15.9 Страна производства: КИТАЙ Объем упаковки (м3): 0.072",
    "price": "13410",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/2f6/2f6cf2a541931c2a6279de8e224c3c21.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/2f6/2f6cf2a541931c2a6279de8e224c3c21.jpg"
    ],
    "specifications": "{\"Вес упаковки (кг)\":\"15.9\",\"Страна производства\":\"КИТАЙ\",\"Объем упаковки (м3)\":\"0.072\"}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.4",
    "reviewCount": 17
  },
  {
    "name": "Чаша для овального бассейна 549x305x107см, Oval Frame Pool",
    "description": "Вес упаковки (кг): 24.55 Страна производства: КИТАЙ Объем упаковки (м3): 0.116",
    "price": "13620",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/043/04325eb2821000ab87e36c4ff6b04714.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/043/04325eb2821000ab87e36c4ff6b04714.jpg"
    ],
    "specifications": "{\"Вес упаковки (кг)\":\"24.55\",\"Страна производства\":\"КИТАЙ\",\"Объем упаковки (м3)\":\"0.116\",\"Размер\":\"549x305x107 см\"}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.8",
    "reviewCount": 7
  },
  {
    "name": "Чаша для каркасного бассейна 400x200x100см, Rectangular Metal Frame Pool",
    "description": "Вес упаковки (кг): 0 Страна производства: КИТАЙ Объем упаковки (м3): 0",
    "price": "13630",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/774/7743367ee92abcdab85016a5e9ce3bb5.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/774/7743367ee92abcdab85016a5e9ce3bb5.jpg"
    ],
    "specifications": "{\"Вес упаковки (кг)\":\"0\",\"Страна производства\":\"КИТАЙ\",\"Объем упаковки (м3)\":\"0\",\"Размер\":\"400x200x100 см\"}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.9",
    "reviewCount": 47
  },
  {
    "name": "Чаша для каркасного бассейна Intex Prism Frame 427х107см",
    "description": "Чаша для каркасного бассейна Intex Prism Frame 427х107см",
    "price": "13680",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "intex",
    "brand": "Intex",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/e02/e026112afe1543211ccec4027c7c968e.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/e02/e026112afe1543211ccec4027c7c968e.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": true,
    "isNew": false,
    "discount": 0,
    "rating": "4.5",
    "reviewCount": 23
  },
  {
    "name": "Каркасный бассейн 366x132см, 10250л, фил.-насос 3785л/ч, скиммер",
    "description": "Вес упаковки (кг): 46,21 Форма бассейна: Круглый Вес товара: 43,5 Страна производства: КИТАЙ Тип фильтр-насоса: Картриджный насос Производительность фильтра л/ч: 3785 Объем, л: 10250 Длина/Диаметр, см: 366 Высота, см: 132 Время установки, мин: 60",
    "price": "13840",
    "originalPrice": null,
    "category": "frame-pools",
    "subcategory": "summer-escapes-polygroup",
    "brand": "Другие",
    "volume": "10250л",
    "imageUrl": "https://basseyn.ru/upload/iblock/eef/vk3fcgpq5igjix00dry2iaoko0uwozqv.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/eef/vk3fcgpq5igjix00dry2iaoko0uwozqv.jpg"
    ],
    "specifications": "{\"Вес упаковки (кг)\":\"46,21\",\"Форма бассейна\":\"Круглый\",\"Вес товара\":\"43,5\",\"Страна производства\":\"КИТАЙ\",\"Тип фильтр-насоса\":\"Картриджный насос\",\"Производительность фильтра л/ч\":\"3785\",\"Объем, л\":\"10250\",\"Длина/Диаметр, см\":\"366\",\"Высота, см\":\"132\",\"Время установки, мин\":\"60\",\"Диаметр\":\"366 см\",\"Высота\":\"132 см\",\"Объем\":\"10250 л\"}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "5.0",
    "reviewCount": 21
  },
  {
    "name": "Чаша для каркасного бассейна 457х122см, Metal Frame Pool",
    "description": "Вес упаковки (кг): 21.1 Страна производства: КИТАЙ Объем упаковки (м3): 0.095",
    "price": "14070",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/b2b/b2bcccbd8da119a29e4eb131e2d90968.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/b2b/b2bcccbd8da119a29e4eb131e2d90968.jpg"
    ],
    "specifications": "{\"Вес упаковки (кг)\":\"21.1\",\"Страна производства\":\"КИТАЙ\",\"Объем упаковки (м3)\":\"0.095\"}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.8",
    "reviewCount": 10
  },
  {
    "name": "Чаша 457x107см для каркасного бассейна Steel Pro",
    "description": "Качественный товар для бассейна от проверенного производителя.",
    "price": "14150",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "bestway",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/f5f/m54ztb7w5bzu2o8ylltwyi17aq403k00.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/f5f/m54ztb7w5bzu2o8ylltwyi17aq403k00.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": true,
    "isNew": false,
    "discount": 0,
    "rating": "4.2",
    "reviewCount": 6
  },
  {
    "name": "Чаша 396x122см для каркасного бассейна, серая",
    "description": "Качественный товар для бассейна от проверенного производителя.",
    "price": "14410",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "bestway",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/df6/fhan5rbj1ii83gpzr6o3wqlaoj0lr3ty.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/df6/fhan5rbj1ii83gpzr6o3wqlaoj0lr3ty.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.4",
    "reviewCount": 8
  },
  {
    "name": "Чаша 412х201х122см для прямоугольного каркасного бассейна",
    "description": "Качественный товар для бассейна от проверенного производителя.",
    "price": "14560",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "bestway",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/be2/t96zb8kr8igs8ghu8zaiarvrsjybm3qy.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/be2/t96zb8kr8igs8ghu8zaiarvrsjybm3qy.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.3",
    "reviewCount": 12
  },
  {
    "name": "Чаша для каркасного бассейна 412х201х122 см, 8124 л",
    "description": "Качественный товар для бассейна от проверенного производителя.",
    "price": "14600",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/3c9/ad7ay9vgwxukofh8lxw5r4zio7c8mz98.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/3c9/ad7ay9vgwxukofh8lxw5r4zio7c8mz98.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.2",
    "reviewCount": 28
  },
  {
    "name": "Чаша 427x122см для каркасного бассейна",
    "description": "Качественный товар для бассейна от проверенного производителя.",
    "price": "14720",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "bestway",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/bcc/cuie2ntulrbq140880bmc9te1kanr102.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/bcc/cuie2ntulrbq140880bmc9te1kanr102.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.2",
    "reviewCount": 20
  },
  {
    "name": "Чаша 412х201х122см для прямоугольного каркасного бассейна, мрамор",
    "description": "Качественный товар для бассейна от проверенного производителя.",
    "price": "14960",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "bestway",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/ec9/awbte8h886mtinjg6yoi7yim8hkxm9i0.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/ec9/awbte8h886mtinjg6yoi7yim8hkxm9i0.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.6",
    "reviewCount": 51
  },
  {
    "name": "Чаша 732х366х122cм для овального бассейна Steel Pro",
    "description": "Вес упаковки (кг): 43.13 Форма бассейна: Овальный Страна производства: КИТАЙ Длина/Диаметр, см: 732 Ширина, см: 366 Высота, см: 122 Объем упаковки (м3): 0.128Чаша для круглого овального бассейна Steel Pro 732х366х122cм. Выполнена из высококачественного трехслойного ПВХ: два слоя винила и внешний слой высокопрочный полиэстер. Отличается высокой прочностью, не подвержена растягиванию, истиранию, воздействию ультрафиолета. Чаша оборудована всем необходимым для подключения систем фильтрации, а также...",
    "price": "15120",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "bestway",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/0de/0defde54e5fef68e5ef11267748e7622.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/0de/0defde54e5fef68e5ef11267748e7622.jpg",
      "https://basseyn.ru/upload/iblock/ad7/ad7a9b971bbf88be74e02807450cd62d.jpg"
    ],
    "specifications": "{\"Вес упаковки (кг)\":\"43.13\",\"Форма бассейна\":\"Овальный\",\"Страна производства\":\"КИТАЙ\",\"Длина/Диаметр, см\":\"732\",\"Ширина, см\":\"366\",\"Высота, см\":\"122\",\"Объем упаковки (м3)\":\"0.128\"}",
    "inStock": true,
    "isPopular": true,
    "isNew": false,
    "discount": 0,
    "rating": "4.5",
    "reviewCount": 53
  },
  {
    "name": "Чаша 360*120см, для бассейна со стальными стенками Hydrium",
    "description": "Качественный товар для бассейна от проверенного производителя.",
    "price": "15500",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/942/942736ffccdf02c3633edbf3bbaca8f1.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/942/942736ffccdf02c3633edbf3bbaca8f1.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "5.0",
    "reviewCount": 33
  },
  {
    "name": "Чаша круглая для бассейна 305 х 140 см. 0.4/0.4 мм. Голубая",
    "description": "Качественный товар для бассейна от проверенного производителя.",
    "price": "15600",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/ead/30lnbr5sak65yb1ifbgutqvdkbbj79m4.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/ead/30lnbr5sak65yb1ifbgutqvdkbbj79m4.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "5.0",
    "reviewCount": 53
  },
  {
    "name": "Чаша круглая для бассейна 305 х 140 см. 0.4/0.4 мм. Лазурит",
    "description": "Качественный товар для бассейна от проверенного производителя.",
    "price": "15600",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/f96/5ays8j3dtw64gp7uj8zcla31nctx0gca.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/f96/5ays8j3dtw64gp7uj8zcla31nctx0gca.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.9",
    "reviewCount": 14
  },
  {
    "name": "Чаша круглая для бассейна 300 х 140 см. 0.4/0.4 мм. Голубая",
    "description": "Качественный товар для бассейна от проверенного производителя.",
    "price": "15600",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/53d/6v08k019b1ar43kee54ykvtm2p2y6n51.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/53d/6v08k019b1ar43kee54ykvtm2p2y6n51.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.9",
    "reviewCount": 37
  },
  {
    "name": "Чаша круглая для бассейна 250 х 140 см, 0.6/0.6 мм. Мрамор",
    "description": "Качественный товар для бассейна от проверенного производителя.",
    "price": "15600",
    "originalPrice": null,
    "category": "accessories",
    "subcategory": "",
    "brand": "Другие",
    "volume": null,
    "imageUrl": "https://basseyn.ru/upload/iblock/17e/c6pfnbmskvg0bj0pc4xjbzscqoly06w1.jpg",
    "images": [
      "https://basseyn.ru/upload/iblock/17e/c6pfnbmskvg0bj0pc4xjbzscqoly06w1.jpg"
    ],
    "specifications": "{}",
    "inStock": true,
    "isPopular": false,
    "isNew": false,
    "discount": 0,
    "rating": "4.3",
    "reviewCount": 49
  }
];

// ... остальные товары будут добавлены динамически
