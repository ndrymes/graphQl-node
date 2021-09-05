const { GraphQLObjectType, GraphQLString, GraphQLID } = require("graphql");

exports.TagType = new GraphQLObjectType({
  name: "Tags",
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
  }),
});
