const graphql = require("graphql");

const { GraphQLString, GraphQLID, GraphQLList } = graphql;
const { UserType, LoginAuthType } = require("../types/user.types");
const { TagType } = require("../types/tags.types");
const {
  RESPONSETYPES: { ERROR },
} = require("../../helpers/constants");

const {
  signUp,
  login,
  editUser,
  deleteUser,
} = require("../../controllers/user.controller");

exports.signUp = {
  type: UserType,
  args: {
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    tags: { type: GraphQLList(GraphQLString) },
    userType: { type: GraphQLString },
    role: { type: GraphQLString },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    duration: { type: GraphQLString },
  },
  resolve(parent, args) {
    return signUp({ reqContext: args });
  },
};

exports.login = {
  type: LoginAuthType,
  args: {
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  resolve(parent, args) {
    return login({ reqContext: args });
  },
};

exports.editUser = {
  type: UserType,
  args: {
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    password: { type: GraphQLString },
    tags: { type: GraphQLList(GraphQLString) },
    userType: { type: GraphQLString },
    duration: { type: GraphQLString },
  },
  resolve(parent, args, req) {
    if (!req.userObject) {
      throw new Error(req.authErrorMsg);
    }
    return editUser({ reqContext: args, userId: req.userObject.userId });
  },
};

exports.deleteUser = {
  type: UserType,
  args: {
    userId: { type: GraphQLID },
  },
  resolve(parent, args, req) {
    if (!req.userObject) {
      throw new Error(req.authErrorMsg);
    }
    if (args.userId !== req.userObject.userId) {
      throw new Error(ERROR.NOT_AUTHORIZED.message);
    }
    return deleteUser({ reqContext: args });
  },
};
