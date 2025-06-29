#!/usr/bin/env node

/**
 * Deployment preparation script for AquaPool
 * Builds the application and prepares files for production deployment
 */

import { execSync } from 'child_process';
import { mkdirSync, existsSync, copyFileSync, writeFileSync } from 'fs';
import path from 'path';

function runCommand(command, description) {
  console.log(`\n🔧 ${description}...`);
  try {
    execSync(command, { stdio: 'inherit' });
    console.log(`✅ ${description} completed successfully`);
  } catch (error) {
    console.error(`❌ Failed to ${description.toLowerCase()}`);
    process.exit(1);
  }
}

function ensureDirectoryExists(dirPath) {
  if (!existsSync(dirPath)) {
    console.log(`📁 Creating directory: ${dirPath}`);
    mkdirSync(dirPath, { recursive: true });
  }
}

function copyFile(src, dest, description) {
  try {
    copyFileSync(src, dest);
    console.log(`📋 ${description}`);
  } catch (error) {
    console.warn(`⚠️  Could not copy ${src}: ${error.message}`);
  }
}

console.log('🚀 Starting deployment preparation process...');

// Ensure required directories exist
ensureDirectoryExists('server');
ensureDirectoryExists('logs');

// Build frontend assets
runCommand('vite build', 'Building frontend assets');

// Build backend server to correct location
runCommand(
  'esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outfile=server/index.js',
  'Building backend server'
);

// Copy essential deployment files
console.log('\n📋 Copying deployment configuration files...');
copyFile('ecosystem.config.js', 'ecosystem.config.js', 'PM2 ecosystem configuration');
copyFile('database-schema.sql', 'database-schema.sql', 'Database schema');

// Create start script for production
const startScript = `#!/bin/bash

# AquaPool Production Start Script
echo "🚀 Starting AquaPool production server..."

# Ensure logs directory exists
mkdir -p logs

# Set environment variables
export NODE_ENV=production
export PORT=\${PORT:-3000}

# Start the application with PM2
if command -v pm2 >/dev/null 2>&1; then
    echo "📦 Starting with PM2..."
    pm2 start ecosystem.config.js --env production
else
    echo "🔧 PM2 not found, starting with Node.js directly..."
    node server/index.js
fi
`;

writeFileSync('start.sh', startScript);
execSync('chmod +x start.sh');
console.log('📋 Created executable start.sh script');

// Create .htaccess for Apache servers
const htaccess = `# AquaPool Apache Configuration
RewriteEngine On

# Handle client-side routing
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_URI} !^/api
RewriteRule . /index.html [L]

# API routing to backend
RewriteCond %{REQUEST_URI} ^/api
RewriteRule ^api/(.*)$ http://localhost:3000/api/$1 [P,L]

# Security headers
Header always set X-Content-Type-Options nosniff
Header always set X-Frame-Options DENY
Header always set X-XSS-Protection "1; mode=block"

# Cache static assets
<FilesMatch "\\.(css|js|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot)$">
    ExpiresActive On
    ExpiresDefault "access plus 1 month"
</FilesMatch>
`;

writeFileSync('.htaccess', htaccess);
console.log('📋 Created .htaccess for Apache configuration');

console.log('\n🎉 Deployment preparation completed successfully!');
console.log('\n📍 Key files created:');
console.log('  ✓ server/index.js - Built backend server');
console.log('  ✓ dist/ - Frontend assets');
console.log('  ✓ start.sh - Production start script');
console.log('  ✓ .htaccess - Apache configuration');
console.log('  ✓ ecosystem.config.js - PM2 configuration');
console.log('\n🚀 Ready for deployment!');