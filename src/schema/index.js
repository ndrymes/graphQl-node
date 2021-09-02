const graphql = require('graphql');

const { GraphQLSchema } = graphql;

const { mutation } = require('./mutations');

const { query } = require('./query');

console.log({ query, mutation });

module.exports = new GraphQLSchema({
  query,
  mutation,
});
