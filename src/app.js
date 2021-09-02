require('dotenv').config();
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { middleware, database } = require('./config');

const app = express();
const root = { hello: () => 'Hello world!' };

const schema = require('./schema/index');

app.use(middleware);

// graphlql endpoint
app.use(
  '/graphql',
  graphqlHTTP((req, res) => ({
    schema,
    rootValue: root,
    graphiql: true,
  })),
);

module.exports = async () => {
  // Attempt database connection
  await database.connect();

  // Health Check Endpoint
  app.use('/', (req, res) => res.send('Ok'));

  return app;
};
