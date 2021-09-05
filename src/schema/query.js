const graphql = require("graphql");

const { GraphQLObjectType } = graphql;

// Queries
const { fetchUsers, getUser } = require("./queries/user.query");
const { fetchTags } = require("./queries/tags.queries");

exports.query = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    // User
    fetchUsers,
    fetchTags,
    getUser
  },
});
