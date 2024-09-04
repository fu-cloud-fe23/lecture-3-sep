const { DynamoDB } = require('@aws-sdk/client-dynamodb'); 
const { DynamoDBDocument } = require('@aws-sdk/lib-dynamodb'); 
const client = new DynamoDB();
const db = DynamoDBDocument.from(client);

// const { DocumentClient } = require('aws-sdk/clients/dynamodb');

// const db = new DocumentClient({
// 	region : process.env.AWS_REGION
// });

module.exports = { db };