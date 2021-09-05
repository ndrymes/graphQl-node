const graphql = require("graphql");

const { GraphQLString, GraphQLID } = graphql;
const { TagType } = require("../types/tags.types");
const {
  RESPONSETYPES: { ERROR },
} = require("../../helpers/constants");

const {
  createTags,
  editTag,
  deleteTags,
} = require("../../controllers/tags.contollers");

exports.createTags = {
  type: TagType,
  args: {
    name: { type: GraphQLString },
    description: { type: GraphQLString },
  },
  resolve(parent, args) {
    return createTags({ reqContext: args });
  },
};

exports.editTags = {
  type: TagType,
  args: {
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    tagId: { type: GraphQLString },
  },
  resolve(parent, args, req) {
    if (!req.userObject) {
      throw new Error(req.authErrorMsg);
    }
    return editTag({ reqContext: args });
  },
};

exports.deleteTags = {
  type: TagType,
  args: {
    tagId: { type: GraphQLID },
  },
  resolve(parent, args, req) {
    if (!req.userObject) {
      throw new Error(req.authErrorMsg);
    }
    return deleteTags({ reqContext: args });
  },
};
