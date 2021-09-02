const graphql = require('graphql');

const { GraphQLList } = graphql;

const { UserType } = require('../types/user.types');

exports.user = {
  type: UserType,
  resolve(parent, args, { user, authErrorMsg }) {
    console.log('here', []);
    if (user == null) throw new Error(authErrorMsg);
    return {
      duration: 6,
    };
  },
};
