const { MongoClient, ServerApiVersion } = require("mongodb");
const config = require("../src/config");

let db_connection;

const client = new MongoClient(config.db.uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

function getConnectionToDB() {
  if (!db_connection) {
    throw new Error("Database connection not established.");
  }
  return db_connection;
}

async function connectToDatabase(dbName) {
  if (db_connection) {
    return db_connection;
  }
  try {
    await client.connect();
    db_connection = client.db(dbName);
    return db_connection;
  } catch (error) {
    console.error("Error connecting to the database:", error);
    throw error;
  }
}

module.exports = {
  getConnectionToDB,
  connectToDatabase,
  client
};
