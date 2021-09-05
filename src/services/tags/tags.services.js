/* eslint-disable no-underscore-dangle */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-useless-catch */
/* eslint-disable no-undef */
const { tagsRepository } = require("../../repositories");
const tagsValidator = require("./tags.validators");
const { RESPONSETYPES, STATUSCODE } = require("../../helpers/constants");
const {
  responseHelper: { errorResponse },
} = require("../../helpers/error.helper");

class TagsService {
  // eslint-disable-next-line class-methods-use-this
  /**
 * create Tags
 * @param {String} request
 * @returns {Object} response tag
 */
  async createTags(requestContext) {
    try {
      // validates request body
      const body = await tagsValidator.createTags(requestContext);
      // check if user exist
      const tagExist = await tagsRepository.getTag({ name: body.name });
      if (tagExist)
        errorResponse(
          RESPONSETYPES.ERROR.TAG_EXIST.message,
          STATUSCODE.bad_request
        );
      const data = await tagsRepository.createTag({ body });
      return data;
    } catch (error) {
      return error;
    }
  }
 /**
 * fetch Tags
 * @param {String} request
 * @returns {Object} response tags
 */
  
  async fetchTags() {
    try {
      // get all tags
      const tags = await tagsRepository.getTags({});
      return tags;
    } catch (error) {
      throw error;
    }
  }

  /**
 * Edit Tags
 * @param {String} request
 * @returns {Object} response tag
 */
  async editTag(requestContext) {
    try {
      // validates request body
      const body = await tagsValidator.updateTags(requestContext);
      const tagExist = await tagsRepository.getTag({ _id: body.tagId });
      if (!tagExist)
        errorResponse(
          RESPONSETYPES.ERROR.INVALID_ID.message,
          STATUSCODE.bad_request
        );
      const tags = await tagsRepository.editTag(body);
      return tags;
    } catch (error) {
      throw error;
    }
  }

  /**
 * delete Tags
 * @param {String} request
 * @returns {Object} response tag
 */
  async deleteTags(requestContext) {
    //In prod enviroment, This should be a soft delete because we dont want to loose data can be useful for metrics and other purposes
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
