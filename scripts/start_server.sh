#!/bin/bash
set -e
cd /home/ubuntu/build
if pgrep -f "node index.js" > /dev/null; then
  echo "Stopping existing server instance..."
  pkill -f "node index.js"
fi
echo "Starting server..."
nohup node index.js > /home/ubuntu/server.log 2>&1 &
sleep 5
if pgrep -f "node index.js" > /dev/null; then
  echo "Server started successfully."
else
  echo "Failed to start the server. Check /home/ubuntu/server.log for details."
  exit 1
fi
