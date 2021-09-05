const graphql = require("graphql");

const { GraphQLList } = graphql;
const { TagType } = require("../types/tags.types");
const { fetchTags } = require("../../controllers/tags.contollers");

exports.fetchTags = {
  type: GraphQLList(TagType),
  resolve(parent, args, req) {
    // Improve this by making it a role based authorization, where it is only a user that is an Admin that can fetch all resources
    if (!req.isAuth) {
      throw new Error(req.authErrorMsg);
    }
    return fetchTags();
  },
};
