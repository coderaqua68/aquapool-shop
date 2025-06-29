#!/usr/bin/env node

/**
 * Quick build script focusing on backend and deployment essentials
 */

import { execSync } from 'child_process';
import { mkdirSync, existsSync } from 'fs';

function ensureDirectoryExists(dirPath) {
  if (!existsSync(dirPath)) {
    console.log(`📁 Creating directory: ${dirPath}`);
    mkdirSync(dirPath, { recursive: true });
  }
}

console.log('🚀 Quick build for deployment...');

// Ensure server directory exists
ensureDirectoryExists('server');
ensureDirectoryExists('logs');

// Build backend server to correct location
console.log('\n🔧 Building backend server...');
try {
  execSync('esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outfile=server/index.js', { stdio: 'inherit' });
  console.log('✅ Backend server built successfully');
} catch (error) {
  console.error('❌ Failed to build backend server');
  process.exit(1);
}

// Test if the built file exists and is valid
if (existsSync('server/index.js')) {
  console.log('✅ Built server file found at: server/index.js');
} else {
  console.error('❌ Built server file not found');
  process.exit(1);
}

console.log('\n🎉 Quick build completed successfully!');
console.log('📍 Server ready for deployment at: server/index.js');
console.log('📍 Use "node server/index.js" to start the production server');