const graphql = require('graphql');

const { GraphQLObjectType } = graphql;

const { signUp, login, editUser } = require('./mutations/user.mutations');
const {
  createTags,
  editTags,
  deleteTags,
} = require('./mutations/tags.mutations');

exports.mutation = new GraphQLObjectType({
  name: 'RootMutation',
  fields: {
    // User
    signUp,
    login,
    editUser,
    createTags,
    editTags,
    deleteTags,
  },
});
