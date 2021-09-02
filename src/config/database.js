const mongoose = require('mongoose');
const debug = require('debug')('codelitt:server');
const { databaseUrl } = require('./env-vars');

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
const connect = async () => {
  try {
    await mongoose.connect(databaseUrl, databaseConnectionOptions);
    debug('Database connection successful');
  } catch (e) {
    // If an error occurs, exit app process
    debug('Database connection failed with error', e);
    process.exit(1);
  }
};

module.exports = {
  connect,
};
