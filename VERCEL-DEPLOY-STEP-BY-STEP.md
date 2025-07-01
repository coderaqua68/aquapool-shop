# Пошаговое развертывание AquaPool на Vercel

## Шаг 1: Скачивание проекта

1. В текущем Replit нажмите на три точки (⋯) в левом меню
2. Выберите "Download as zip"
3. Сохраните архив на компьютер
4. Распакуйте в папку (например, на Рабочий стол)

## Шаг 2: Подготовка для Vercel

Создаем файл vercel.json в корне проекта:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "server/index.ts",
      "use": "@vercel/node"
    },
    {
      "src": "client/dist/**",
      "use": "@vercel/static"
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
    "NODE_ENV": "production"
  }
}
```

## Шаг 3: Регистрация на Vercel

1. Идите на https://vercel.com
2. Нажмите "Sign Up"
3. Выберите "Continue with GitHub" (или email)
4. Создайте аккаунт бесплатно

## Шаг 4: Создание GitHub репозитория

1. Идите на https://github.com
2. Нажмите "New repository"
3. Название: `aquapool-shop`
4. Оставьте Public
5. Нажмите "Create repository"

## Шаг 5: Загрузка кода на GitHub

1. Скачайте GitHub Desktop: https://desktop.github.com
2. Установите и войдите в аккаунт
3. Нажмите "Clone a repository from the Internet"
4. Выберите ваш репозиторий `aquapool-shop`
5. Скопируйте все файлы из распакованного Replit в папку репозитория
6. В GitHub Desktop нажмите "Commit to main"
7. Нажмите "Push origin"

## Шаг 6: Развертывание на Vercel

1. В Vercel нажмите "New Project"
2. Выберите "Import Git Repository"
3. Найдите `aquapool-shop` и нажмите "Import"
4. Framework Preset: оставьте "Other"
5. Root Directory: оставьте пустым
6. Нажмите "Deploy"

## Шаг 7: Настройка базы данных

1. После развертывания идите в Dashboard проекта
2. Вкладка "Storage"
3. Нажмите "Create Database"
4. Выберите "Neon (PostgreSQL)"
5. Нажмите "Continue"
6. Скопируйте DATABASE_URL

## Шаг 8: Добавление переменных окружения

1. В проекте Vercel идите в "Settings"
2. Вкладка "Environment Variables"
3. Добавьте:
   - Name: `DATABASE_URL`
   - Value: скопированная строка подключения
4. Нажмите "Save"

## Шаг 9: Повторное развертывание

1. Идите в "Deployments"
2. Нажмите "Redeploy" на последнем деплое
3. Выберите "Use existing Build Cache"
4. Нажмите "Redeploy"

## Шаг 10: Проверка сайта

Откройте ссылку вашего сайта (например: https://aquapool-shop.vercel.app)

Сайт будет ТОЧНО такой же как в превью с:
- Видео фоном
- Всеми анимациями
- WhatsApp интеграцией  
- Полной функциональностью
- 300 товарами