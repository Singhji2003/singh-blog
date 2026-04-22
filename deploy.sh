#!/bin/bash

cd /home/ubuntu/singh-blog

echo "Pulling latest code..."
git pull origin main

echo "Installing backend dependencies..."
cd backend
npm install

echo "Building frontend..."
cd ../frontend
npm install
npm run build

echo "Restarting backend..."
pm2 restart index
echo "Done!"
