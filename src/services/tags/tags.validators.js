/* eslint-disable no-useless-catch */
const Joi = require('joi');
const mongoose = require('mongoose');
const constants = require('../../constants');

const { ObjectId } = mongoose.Types;

class TagsValidator {
  constructor() {
    this.Joi = Joi;
    this.constants = constants;
  }

  createTags(data) {
    const { Joi } = this;
    const schema = {
      name: Joi.string().required().max(20).trim(),
      description: Joi.string().required(),
    };
    return Joi.object(schema).validateAsync(data);
  }

  updateTags(data) {
    try {
      if (Object.keys(data).length === 0) {
        throw new Error('At least one field must be supplied for update');
      }
      const { Joi } = this;
      const schema = {
        name: Joi.string().max(20).trim(),
        description: Joi.string(),
        tagId: Joi.string().required(),
      };
      return Joi.object(schema).validateAsync(data);
    } catch (error) {
      throw error;
    }
  }

  deleteTags(data) {
    const { Joi } = this;
    const schema = {
      tagId: Joi.string().required(),
    };
    return Joi.object(schema).validateAsync(data);
  }
}
const tagsValidator = new TagsValidator();
module.exports = tagsValidator;
