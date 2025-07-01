# ✅ ФИНАЛЬНЫЙ ЧЕК-ЛИСТ для развертывания на Beget

## ✅ Уже готово:
- [x] PostgreSQL база данных создана
- [x] Файл .env.production настроен с данными базы
- [x] Все инструкции подготовлены

## 📦 СЕЙЧАС: Создайте ZIP архив

### Включите в архив:
```
📁 client/                    (полностью)
📁 server/                    (полностью)  
📁 shared/                    (полностью)
📄 package.json
📄 package-lock.json
📄 vite.config.ts
📄 tsconfig.json
📄 tailwind.config.ts
📄 postcss.config.js
📄 components.json
📄 drizzle.config.ts
📄 .env.production           ← ПЕРЕИМЕНУЙТЕ в .env
📄 .htaccess
📄 database-schema.sql
📄 start.sh
📄 ecosystem.config.js
```

### НЕ включайте:
- node_modules/
- dist/
- .git/
- attached_assets/
- *-price-update.js

## 🚀 На сервере Beget выполните:

1. **Загрузите архив** в public_html/
2. **Распакуйте архив**
3. **Подключитесь по SSH** и выполните:

```bash
cd ~/public_html/
chmod +x start.sh
npm install
psql $DATABASE_URL -f database-schema.sql
npm run build
./start.sh
```

## 🎯 Результат:
Сайт будет доступен на вашем домене через 10-15 минут!

## 📞 Поддержка:
Если возникнут проблемы, проверьте логи PM2:
```bash
pm2 logs aquapool
```