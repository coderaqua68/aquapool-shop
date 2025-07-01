import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

// Создаем минимальный архив для развертывания
function createDeploymentArchive() {
  console.log('Создание архива для развертывания...');
  
  // Создаем папку для развертывания
  if (!fs.existsSync('deploy')) {
    fs.mkdirSync('deploy');
  }
  
  // Копируем основные файлы
  const filesToCopy = [
    'package.json',
    'tsconfig.json',
    'vite.config.ts',
    'drizzle.config.ts',
    'vercel.json',
    'tailwind.config.ts',
    'components.json'
  ];
  
  filesToCopy.forEach(file => {
    if (fs.existsSync(file)) {
      fs.copyFileSync(file, path.join('deploy', file));
      console.log(`✓ Скопирован ${file}`);
    }
  });
  
  // Копируем папки
  const foldersToCP = ['client', 'server', 'shared'];
  
  foldersToCP.forEach(folder => {
    if (fs.existsSync(folder)) {
      execSync(`cp -r ${folder} deploy/`, { stdio: 'inherit' });
      console.log(`✓ Скопирована папка ${folder}`);
    }
  });
  
  console.log('Архив готов в папке deploy/');
}

// Создаем ссылку для скачивания
function createDownloadLink() {
  console.log('\n=== ИНСТРУКЦИЯ ===');
  console.log('1. Скачайте папку "deploy" из Replit');
  console.log('2. Заархивируйте её в ZIP файл');
  console.log('3. Идите на https://vercel.com/new');
  console.log('4. Перетащите ZIP файл в Vercel');
  console.log('5. Нажмите Deploy');
  console.log('==================\n');
}

// Запускаем
try {
  createDeploymentArchive();
  createDownloadLink();
} catch (error) {
  console.error('Ошибка:', error.message);
}