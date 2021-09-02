/* eslint-disable no-useless-catch */
const Joi = require('joi');
const mongoose = require('mongoose');
const constants = require('../../constants');

const { ObjectId } = mongoose.Types;

class UsersValidator {
  constructor() {
    this.Joi = Joi;
    this.constants = constants;
  }

  signUp(data) {
    const { Joi } = this;
    const schema = {
      email: Joi.string().required(),
      password: Joi.string().required(),
      role: Joi.string().required(),
      tags: Joi.string(),
      firstName: Joi.string(),
      lastName: Joi.string(),
      userType: Joi.string()
        .valid(...this.constants.USERTYPEKEYS)
        .required(),
      status: Joi.string().valid(...this.constants.STATUSKEYS),
    };
    return Joi.object(schema).validateAsync(data);
  }

  updateUsers(data) {
    try {
      if (Object.keys(data).length === 0) {
        throw new Error('At least one field must be supplied for update');
      }
      const { Joi } = this;
      const schema = {
        name: Joi.string(),
      };
      return Joi.object(schema).validateAsync(data);
    } catch (error) {
      throw error;
    }
  }

  updateHobbies(data) {
    try {
      if (Object.keys(data).length === 0) {
        throw new Error('At least one field must be supplied for update');
      }
      const { Joi } = this;
      const schema = {
        hobbies: Joi.array(),
      };
      return Joi.object(schema).validateAsync(data);
    } catch (error) {
      throw error;
    }
  }
}
const usersValidator = new UsersValidator();
module.exports = usersValidator;
