const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
} = require("graphql");
const { TagType } = require("./tags.types");
const UserType = new GraphQLObjectType({
  name: "Users",
  fields: () => ({
    _id: { type: GraphQLID },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    duration: { type: GraphQLString },
    password: { type: GraphQLString },
    email: { type: GraphQLString },
    userType: { type: GraphQLString },
    tags: { type: GraphQLList(TagType) },
    role: { type: GraphQLString },
    status: { type: GraphQLString },
  }),
});

exports.LoginAuthType = new GraphQLObjectType({
  name: "LoginUser",
  fields: () => ({
    user: { type: UserType },
    token: { type: GraphQLString },
  }),
});

exports.UserType = UserType;
