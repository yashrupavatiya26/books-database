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
cd /opt/codedeploy-agent/deployment-root/*/deployment-archive/
if [ ! -f "build.zip" ]; then
  echo "Error: build.zip not found in the deployment directory"
  exit 1
fi
echo "Downloading build artifact from S3..."
S3_BUCKET="codebuild-cicd-monitoring"
S3_OBJECT="build.zip"
aws s3 cp s3://$S3_BUCKET/$S3_OBJECT /opt/codedeploy-agent/deployment-root/*/deployment-archive/build.zip
echo "Extracting build artifact..."
unzip -o /opt/codedeploy-agent/deployment-root/*/deployment-archive/build.zip -d /home/ubuntu/build
echo "Installing Node.js dependencies..."
cd /home/ubuntu/build
npm install

echo "Dependencies installed successfully!"
