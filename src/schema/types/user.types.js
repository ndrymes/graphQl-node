const { GraphQLObjectType, GraphQLString, GraphQLID } = require('graphql');

const UserType = new GraphQLObjectType({
  name: 'Users',
  fields: () => ({
    _id: { type: GraphQLID },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    duration: { type: GraphQLString },
    password: { type: GraphQLString },
    email: { type: GraphQLString },
    type: { type: GraphQLString },
    role: { type: GraphQLString },
    status: { type: GraphQLString },
  }),
});

exports.LoginAuthType = new GraphQLObjectType({
  name: 'LoginUser',
  fields: () => ({
    user: { type: UserType },
    token: { type: GraphQLString },
  }),
});

exports.UserType = UserType;
