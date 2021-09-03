const graphql = require('graphql');

const { GraphQLList } = graphql;
const { UserType, LoginAuthType } = require('../types/user.types');
const { fetchUsers } = require('../../controllers/user.controller');

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
