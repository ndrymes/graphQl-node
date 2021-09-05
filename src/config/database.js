const mongoose = require("mongoose");
const debug = require("debug")("codelitt:server");
const { databaseUrl } = require("./env-vars");
const { MongoMemoryServer } = require("mongodb-memory-server");

const databaseConnectionOptions = {
  useNewUrlParser: true,
  keepAlive: 1,
  connectTimeoutMS: 30000,
  useUnifiedTopology: true,
  retryWrites: true,
};

/**
 * The connect function is initiates a connection to the database.
 * If the connection is unsuccessful or throws an error, the app is exited.
 * @return void
 */

const getUrl = async () =>
  new Promise(async (resolve, reject) => {
    try {
      if (process.env.NODE_ENV === "test") {
        // This will create an new instance of "MongoMemoryServer" and automatically start it
        const mongod = await MongoMemoryServer.create();
        const url = mongod.getUri();

        // The Server can be stopped again with
        return resolve(url);
        // use an in memory Db for test purpose
      }
      // use your mongodb for other enviroments
      return resolve(databaseUrl);
    } catch (error) {
      reject(error);
    }
  });
const connect = async () => {
  try {
    const url = await getUrl();
    console.log({ url });
    await mongoose.connect(url, databaseConnectionOptions);
    debug("Database connection successful");
  } catch (e) {
    // If an error occurs, exit app process
    debug("Database connection failed with error", e);
    process.exit(1);
  }
};

module.exports = {
  connect,
};
