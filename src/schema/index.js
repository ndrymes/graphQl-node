const graphql = require("graphql");

const { GraphQLSchema } = graphql;

const { mutation } = require("./mutations");

const { query } = require("./query");

module.exports = new GraphQLSchema({
  query,
  mutation,
});
