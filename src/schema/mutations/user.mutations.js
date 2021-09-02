const graphql = require('graphql');

const { GraphQLString, GraphQLID, GraphQLList } = graphql;
const { UserType } = require('../types/user.types');

const { signUp } = require('../../controllers/user.controller');

exports.signUp = {
  type: UserType,
  args: {
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    tag: { type: GraphQLString },
    userType: { type: GraphQLString },
    role: { type: GraphQLString },
    duration: { type: GraphQLString },
  },
  resolve(parent, args) {
    return signUp({ reqContext: args });
  },
};
