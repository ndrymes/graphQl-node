/* eslint-disable no-underscore-dangle */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-useless-catch */
/* eslint-disable no-undef */
const { tagsRepository } = require('../../repositories');
const tagsValidator = require('./tags.validators');
const { RESPONSETYPES, STATUSCODE } = require('../../constants');
const {
  responseHelper: { errorResponse },
} = require('../../helpers/error.helper');

class TagsService {
  // eslint-disable-next-line class-methods-use-this
  async createTags(requestContext) {
    try {
      // validates request body
      const body = await tagsValidator.createTags(requestContext);
      // check if user exist
      const tagExist = await tagsRepository.getTag({ name: body.name });
      if (tagExist)
        errorResponse(
          RESPONSETYPES.ERROR.TAG_EXIST.message,
          STATUSCODE.bad_request,
        );
      const data = await tagsRepository.createTag({ body });
      return data;
    } catch (error) {
      return error;
    }
  }

  async fetchTags() {
    try {
      // get all tags
      const tags = await tagsRepository.getTags({});
      return tags;
    } catch (error) {
      throw error;
    }
  }

  async editTag(requestContext) {
    try {
      // validates request body
      const body = await tagsValidator.updateTags(requestContext);
      const tagExist = await tagsRepository.getTag({ _id: body.tagId });
      if (!tagExist)
        errorResponse(
          RESPONSETYPES.ERROR.INVALID_ID.message,
          STATUSCODE.bad_request,
        );
      const tags = await tagsRepository.editTag(body);
      return tags;
    } catch (error) {
      throw error;
    }
  }

  async deleteTags(requestContext) {
    try {
      // validates request body
      const body = await tagsValidator.deleteTags(requestContext);
      const users = await tagsRepository.deletetag(body.tagId);
      return users;
    } catch (error) {
      throw error;
    }
  }
}

const tagsService = new TagsService();
module.exports = tagsService;
