#!/bin/bash

echo "🚀 Starting AquaPool production server..."
export NODE_ENV=production

# Use deployment environment port or fallback to appropriate defaults
if [ -z "$PORT" ]; then
  if [ -n "$REPL_ID" ]; then
    export PORT=5000  # Replit uses port 5000
  else
    export PORT=3000  # Other deployments use port 3000
  fi
fi

echo "📍 Using port: $PORT"
echo "🌐 Environment: $NODE_ENV"
echo "🏊‍♂️ Starting AquaPool server..."

# Ensure server/index.js exists
if [ ! -f "server/index.js" ]; then
  echo "❌ server/index.js not found. Running build process..."
  npm run build
fi

# Start the server
node server/index.js