# Telegram-бот + ИИ на Vercel

1. Создайте бота у @BotFather, сохраните токен.
2. Установите Vercel CLI: `npm i -g vercel`, затем `vercel login`.
3. В папке проекта выполните `vercel` (первый деплой).
4. Добавьте переменные окружения (см. .env.example) в Vercel:
   Settings -> Environment Variables (или `vercel env add`).
   НИКОГДА не записывайте ключи в код.
5. `vercel --prod`
6. Привяжите webhook, открыв в браузере:
   https://api.telegram.org/bot<TELEGRAM_TOKEN>/setWebhook?url=https://<проект>.vercel.app/api/webhook&secret_token=<WEBHOOK_SECRET>
7. Напишите боту.
