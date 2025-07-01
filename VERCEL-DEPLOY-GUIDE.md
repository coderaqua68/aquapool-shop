# 🌐 Альтернативное развертывание на Vercel (если Beget не поддерживает Node.js)

## Если на Beget.com возникают проблемы с Node.js

Vercel - отличная альтернатива для React + Express приложений.

### Шаг 1: Подготовка к Vercel

1. Зарегистрируйтесь на [vercel.com](https://vercel.com)
2. Установите Vercel CLI:
   ```bash
   npm install -g vercel
   ```

### Шаг 2: Конфигурация для Vercel

Создайте файл `vercel.json` в корне проекта:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "client/dist/**",
      "use": "@vercel/static"
    },
    {
      "src": "server/index.ts",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/server/index.ts"
    },
    {
      "src": "/(.*)",
      "dest": "/client/dist/$1"
    }
  ],
  "env": {
    "DATABASE_URL": "@database_url",
    "TELEGRAM_BOT_TOKEN": "@telegram_bot_token"
  }
}
```

### Шаг 3: База данных

Используйте Neon (бесплатный PostgreSQL):
1. Зарегистрируйтесь на [neon.tech](https://neon.tech)
2. Создайте проект
3. Скопируйте DATABASE_URL

### Шаг 4: Развертывание

```bash
# Сборка проекта
npm run build

# Логин в Vercel
vercel login

# Развертывание
vercel --prod

# Добавление переменных окружения
vercel env add DATABASE_URL
vercel env add TELEGRAM_BOT_TOKEN
```

### Шаг 5: Настройка домена

В панели Vercel:
1. Перейдите в Project Settings
2. Domains → Add Domain
3. Следуйте инструкциям для настройки DNS

### Преимущества Vercel:
- Бесплатный SSL
- Автоматическое масштабирование
- Быстрый CDN
- Простое развертывание
- Отличная поддержка React + Node.js

### Недостатки:
- Ограничения на бесплатном плане
- Нужна отдельная база данных