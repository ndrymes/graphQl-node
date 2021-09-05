const graphql = require("graphql");

const { GraphQLList, GraphQLString } = graphql;
const { UserType } = require("../types/user.types");
const { fetchUsers, getUser } = require("../../controllers/user.controller");

exports.fetchUsers = {
  type: GraphQLList(UserType),
  resolve(parent, args, req) {
    // Improve this by making it a role based authorization, where it is only a user that is an Admin that can fetch all resources
    if (!req.isAuth) {
      throw new Error(req.authErrorMsg);
    }
    return fetchUsers();
  },
};

exports.getUser = {
  type: UserType,
  resolve(parent, args, req) {
    // Improve this by making it a role based authorization, where it is only a user that is an Admin that can fetch all resources
    if (!req.isAuth) {
      throw new Error(req.authErrorMsg);
    }
    if (req.userObject == null) {
      throw new Error(req.authErrorMsg);
    }
    const reqContext = { userId: req.userObject.userId };
    return getUser({ reqContext });
  },
};
