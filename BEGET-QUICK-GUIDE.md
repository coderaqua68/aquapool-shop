# 🚀 Быстрое развертывание AquaPool на Beget.com

## 📋 Что нужно сделать по порядку:

### 1. Создание базы данных PostgreSQL в панели Beget
- Войдите в панель управления хостингом
- Раздел "Базы данных" → "PostgreSQL"
- Создайте новую БД: `aquapool_db`
- Запишите: хост, порт, логин, пароль

### 2. Настройка переменных окружения
Откройте файл `.env.production` и замените:

```
DATABASE_URL=postgresql://ваш_логин:ваш_пароль@ваш_хост:5432/aquapool_db
```

### 3. Создание архива для загрузки
После `npm run build` создайте ZIP архив с файлами:
- Папка `dist/` (собранный фронтенд)
- Папка `server/` (бэкенд код)  
- `package.json` и `package-lock.json`
- `.env.production` (переименуйте в `.env`)
- `.htaccess`
- `start.sh`
- `ecosystem.config.js`
- `database-schema.sql`

### 4. Загрузка на Beget
- FTP/SFTP подключение к серверу
- Распаковать в `public_html/`
- Права на `start.sh`: `chmod +x start.sh`

### 5. Установка и запуск по SSH
```bash
cd ~/public_html/
npm install --production
psql $DATABASE_URL -f database-schema.sql
./start.sh
```

### 6. Настройка веб-сервера
Файл `.htaccess` уже создан и настроит Apache автоматически.

## ✅ Проверка работы
- Откройте ваш домен
- Проверьте: главная страница, каталог, админ-панель (/admin)
- Логин админки: `admin`, пароль: `aquapool2025`

## 🆘 Если что-то не работает:
- Проверьте логи: `pm2 logs aquapool`
- База данных: убедитесь в правильности DATABASE_URL
- Node.js: возможно нужно установить через поддержку Beget

## 📞 Контакты
Техподдержка Beget.com поможет с настройкой Node.js и PostgreSQL