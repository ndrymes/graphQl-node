const graphql = require('graphql');

const { GraphQLObjectType } = graphql;

// Queries
const { user } = require('./queries/user.query');

exports.query = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    // User
    user,
  },
});
