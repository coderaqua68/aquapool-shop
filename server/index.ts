import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { testTelegramBot } from "./telegram";

const app = express();
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: false, limit: '50mb' }));

// Serve static files from attached_assets
app.use('/attached_assets', express.static('attached_assets'));

// Serve verification files from root
app.use(express.static('.', { 
  dotfiles: 'allow',
  setHeaders: (res, path) => {
    if (path.includes('yandex_') && path.endsWith('.html')) {
      res.setHeader('Content-Type', 'text/html; charset=UTF-8');
    }
  }
}));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  // Специальный маршрут для файла верификации Яндекса
  app.get('/yandex_816365dd176df39c.html', (req, res) => {
    res.setHeader('Content-Type', 'text/html; charset=UTF-8');
    res.send(`<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    </head>
    <body>Verification: 816365dd176df39c</body>
</html>`);
  });

  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // ALWAYS serve the app on port 5000
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = 5000;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true,
  }, () => {
    console.log(`🚀 AquaPool Production Server запущен на порту ${port}`);
    console.log(`📊 Функционал: 300+ товаров, корзина, админ-панель`);
    console.log(`💬 WhatsApp интеграция активна`);
    console.log(`📈 Yandex.Metrika аналитика подключена`);
    console.log(`🔐 Админ-панель: /admin (admin / aquapool2025)`);
    console.log(`🌐 Готов к подключению домена aquapool-shop.ru`);
    
    // Тестируем Telegram бота при запуске
    testTelegramBot().then(result => {
      if (result.success) {
        console.log('✅ Telegram бот успешно подключен');
      } else {
        console.log('❌ Ошибка подключения к Telegram боту:', result.error);
      }
    }).catch(error => {
      console.log('❌ Ошибка тестирования Telegram бота:', error);
    });
  });
})();
