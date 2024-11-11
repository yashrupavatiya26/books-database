#!/bin/bash
set -e
echo "Starting installation of dependencies..."
sudo apt update -y
sudo apt install -y unzip nodejs npm awscli
echo "Downloading build artifact from S3..."
S3_BUCKET="codebuild-cicd-monitoring"
S3_OBJECT="build.zip"
aws s3 cp s3://$S3_BUCKET/$S3_OBJECT /home/ubuntu/build.zip
echo "Extracting build artifact..."
unzip -o /home/ubuntu/build.zip -d /home/ubuntu/build
echo "Installing Node.js dependencies..."
cd /home/ubuntu/build
npm install
echo "Dependencies installed successfully!"
