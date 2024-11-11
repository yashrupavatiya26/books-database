#!/bin/bash
set -e  
echo "Starting installation of dependencies..."
echo "Updating package list..."
sudo apt update -y
echo "Installing necessary dependencies..."
sudo apt install -y unzip nodejs npm curl
echo "Installing AWS CLI..."
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install
echo "Verifying AWS CLI installation..."
aws --version
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
