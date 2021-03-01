// load env file
const dotenv = require('dotenv');
dotenv.config();

//import mongo driver
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const { logInfo, logWarn } = require('./utils');

// DbConnection singleton
let client= null;
let POOL_SIZE = process.env.POOL_SIZE || "10";
let poolSize = parseInt(POOL_SIZE);
// return database client
const getClient = async () => {
  // if client instance is already present then return the same instance
  if (client) {
    return client;
  }

  // if DB_URL is not found then throw error
  if (!process.env.DB_URL) {
    throw new Error("DB_URL not found");
  }

  logInfo(JSON.stringify({ poolSize }));

  // otherwise acquire db client and then return
  client = await MongoClient.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology:true, poolSize });
  logWarn("Created New Database client");
  return client;
};

// generates a new client and returns the new instance every time
const getNewClient = async () => {
  console.log('called')
  // if DB_URL is not found then throw error
  if (!process.env.DB_URL) {
    throw new Error("DB_URL not found");
  }
 
  return await MongoClient.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
};

// close database client
const closeClient = async () => {
  if (client) {
    await client.close();
    client = null;
  }
};
  
module.exports = { 
  getClient, 
  getNewClient, 
  closeClient 
};
