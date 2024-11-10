#!/bin/bash
set -e
cd /home/ubuntu/build
node index.js > /home/ubuntu/server.log 2>&1 &
