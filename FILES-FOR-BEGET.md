# 📦 Список файлов для загрузки на Beget.com

## Создайте ZIP архив с этими файлами:

### 📁 Папки (полностью):
- `client/` - весь фронтенд
- `server/` - весь бэкенд  
- `shared/` - общие типы

### 📄 Конфигурационные файлы:
- `package.json`
- `package-lock.json`
- `vite.config.ts`
- `tsconfig.json`
- `tailwind.config.ts`
- `postcss.config.js`
- `components.json`
- `drizzle.config.ts`

### ⚙️ Файлы для развертывания:
- `.env.production` ➜ **переименовать в `.env`**
- `.htaccess`
- `database-schema.sql`
- `start.sh`
- `ecosystem.config.js`

### 📋 НЕ включайте в архив:
- `node_modules/` (установится на сервере)
- `dist/` (соберется на сервере)
- `.git/` (не нужно)
- Файлы `*-price-update.js` (скрипты парсера)
- Папку `attached_assets/`

---

## 🚀 После создания архива:

1. **Загрузите** архив на Beget в папку `public_html/`
2. **Распакуйте** архив
3. **Подключитесь по SSH** и выполните:
   ```bash
   cd ~/public_html/
   chmod +x start.sh
   npm install
   psql $DATABASE_URL -f database-schema.sql
   npm run build
   ./start.sh
   ```

Готово! Сайт будет работать на вашем домене.