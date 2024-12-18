const AWS = require('aws-sdk');
const dotenv = require('dotenv');

// Charger le fichier aws.env
dotenv.config({ path: 'keys.env' });

// Configure AWS SDK
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();
const dynamoDB = new AWS.DynamoDB.DocumentClient();

module.exports = { s3, dynamoDB };
