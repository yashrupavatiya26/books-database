#!/bin/bash
set -e
sudo apt update -y
sudo apt install unzip -y nodejs npm awscli
sudo apt install nodejs -y
sudo apt install npm -y
sudo apt install awscli -y
aws s3 cp s3://codebuild-cicd-monitoring/build.zip /home/ubuntu/build.zip
unzip -o /home/ubuntu/build.zip -d /home/ubuntu/build
cd /home/ubuntu/build
npm install
npm install aws-sdk
