/* eslint-disable no-useless-catch */
const Joi = require("joi");
const mongoose = require("mongoose");
const constants = require("../../helpers/constants");

const { ObjectId } = mongoose.Types;

class UsersValidator {
  constructor() {
    this.Joi = Joi;
    this.constants = constants;
  }

  signUp(data) {
    const { Joi } = this;
    const schema = {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      role: Joi.string().required(),
      tags: Joi.string(),
      firstName: Joi.string(),
      lastName: Joi.string(),
      duration: Joi.number(),
      userType: Joi.string()
        .valid(...this.constants.USERTYPEKEYS)
        .required(),
    };
    return Joi.object(schema).validateAsync(data);
  }

  login(data) {
    const { Joi } = this;
    const schema = {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    };
    return Joi.object(schema).validateAsync(data);
  }

  getUser(data) {
    const { Joi } = this;
    const schema = {
      userId: Joi.string().required(),
    };
    return Joi.object(schema).validateAsync(data);
  }
  updateUsers(data) {
    try {
      if (Object.keys(data).length === 0) {
        throw new Error("At least one field must be supplied for update");
      }
      const { Joi } = this;
      const schema = {
        email: Joi.string().email(),
        password: Joi.string(),
        role: Joi.string(),
        tags: Joi.array(),
        firstName: Joi.string(),
        lastName: Joi.string(),
        userType: Joi.string().valid(...this.constants.USERTYPEKEYS),
      };
      return Joi.object(schema).validateAsync(data);
    } catch (error) {
      throw error;
    }
  }

  deleteUser(data) {
    const { Joi } = this;
    const schema = {
      userId: Joi.string().required(),
    };
    return Joi.object(schema).validateAsync(data);
  }
}
const usersValidator = new UsersValidator();
module.exports = usersValidator;
