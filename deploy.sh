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
rm -rf .next
npm run build
pm2 restart frontend
echo "Restarting backend..."
cd ../backend
pm2 restart index
echo "Done!"
