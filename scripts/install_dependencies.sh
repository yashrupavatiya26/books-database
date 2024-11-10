#!/bin/bash
set -e
sudo apt update -y
sudo apt install -y unzip nodejs npm awscli
aws s3 cp s3://codebuild-cicd-monitoring/build.zip /home/ubuntu/build.zip
unzip -o /home/ubuntu/build.zip -d /home/ubuntu/build
cd /home/ubuntu/build
npm install
npm install aws-sdk
