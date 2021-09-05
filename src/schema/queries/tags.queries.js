const graphql = require("graphql");

const { GraphQLList } = graphql;
const { TagType } = require("../types/tags.types");
const { fetchTags } = require("../../controllers/tags.contollers");

exports.fetchTags = {
  type: GraphQLList(TagType),
  resolve(parent, args, req) {
    if (!req.isAuth) {
      throw new Error(req.authErrorMsg);
    }
    return fetchTags();
  },
};
