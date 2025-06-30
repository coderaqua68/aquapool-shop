import express from 'express';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { routes } from './server/routes.js';
import { connectToDatabase } from './server/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Production middleware
app.use(cors({
  origin: ['https://aquapool-shop.ru', 'https://www.aquapool-shop.ru'],
  credentials: true
}));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Connect to database
await connectToDatabase();

// API routes
app.use('/api', routes);

// Serve Yandex verification file
app.get('/yandex_816365dd176df39c.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'yandex_816365dd176df39c.html'));
});

// Serve static files from dist
app.use(express.static(path.join(__dirname, 'dist')));

// Catch-all handler for React routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Error handling
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 AquaPool production server running on port ${PORT}`);
  console.log(`🌐 Domain: https://aquapool-shop.ru`);
  console.log(`📊 Analytics: Yandex.Metrika active`);
  console.log(`💬 WhatsApp integration ready`);
  console.log(`🤖 Telegram notifications active`);
});

export default app;