#!/usr/bin/env node

/**
 * Production build script that ensures proper file placement for deployment
 */

import { execSync } from 'child_process';
import { mkdirSync, existsSync } from 'fs';
import path from 'path';

function runCommand(command, description, timeout = 300000) {
  console.log(`\n🔧 ${description}...`);
  try {
    execSync(command, { stdio: 'inherit', timeout });
    console.log(`✅ ${description} completed successfully`);
  } catch (error) {
    console.error(`❌ Failed to ${description.toLowerCase()}`);
    if (error.code === 'TIMEOUT') {
      console.error(`Build timed out after ${timeout/1000} seconds`);
    }
    process.exit(1);
  }
}

function ensureDirectoryExists(dirPath) {
  if (!existsSync(dirPath)) {
    console.log(`📁 Creating directory: ${dirPath}`);
    mkdirSync(dirPath, { recursive: true });
  }
}

console.log('🚀 Starting production build process...');

// Ensure server directory exists
ensureDirectoryExists('server');

// Build frontend
runCommand('vite build', 'Building frontend assets');

// Build backend to the correct location
runCommand(
  'esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outfile=server/index.js',
  'Building backend server'
);

console.log('\n🎉 Production build completed successfully!');
console.log('📍 Server file location: server/index.js');
console.log('📍 Frontend assets location: dist/');