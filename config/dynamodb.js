const AWS = require('aws-sdk');

// Configure AWS SDK for DynamoDB
AWS.config.update({ region: 'ap-south-1' }); // Replace with your AWS region

const dynamoDB = new AWS.DynamoDB.DocumentClient();

module.exports = dynamoDB;
