#!/bin/bash
echo "🚀 Starting AquaPool production server..."
export NODE_ENV=production
export PORT=${PORT:-3001}
node server/index.js
