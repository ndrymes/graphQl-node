const graphql = require('graphql');

const { GraphQLObjectType } = graphql;

const { signUp } = require('./mutations/user.mutations');

exports.mutation = new GraphQLObjectType({
  name: 'RootMutation',
  fields: {
    // User
    signUp,
  },
});
