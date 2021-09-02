const { GraphQLObjectType, GraphQLString, GraphQLID } = require('graphql');

const UserType = new GraphQLObjectType({
  name: 'Users',
  fields: () => ({
    _id: { type: GraphQLID },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    email: { type: GraphQLString },
    type: { type: GraphQLString },
    role: { type: GraphQLString },
    duration: { type: GraphQLString },
    password: { type: GraphQLString },
    status: { type: GraphQLString },
  }),
});

exports.UserType = UserType;
