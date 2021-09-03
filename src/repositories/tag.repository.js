/* eslint-disable class-methods-use-this */
const TagModel = require('../models/tags.model');

class TagRepository {
  // persist tag in the database
  async createTag({ body }) {
    return TagModel.create(body);
  }

  // fetch single tag from the database
  async getTag(body) {
    return TagModel.findOne(body);
  }

  // fetch all tags from the database
  async getTags(body) {
    return TagModel.find(body);
  }

  // update a tag in the database
  async editTag(body) {
    return TagModel.findOneAndUpdate({ _id: body.tagId }, body, { new: true });
  }

  // delete a tag from the database
  async deletetag(tagId) {
    return TagModel.findOneAndDelete({ _id: tagId });
  }
}

const tagRepository = new TagRepository();
module.exports = tagRepository;
