/* eslint-disable no-underscore-dangle */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-useless-catch */
/* eslint-disable no-undef */
const bcrypt = require("bcryptjs");
const { userRepository } = require("../../repositories");
const userValidator = require("./users.validators");
const { RESPONSETYPES, STATUSCODE } = require("../../helpers/constants");
const authTokenHelper = require("../../helpers/auth-token.helper");
const {
  responseHelper: { errorResponse },
} = require("../../helpers/error.helper");

class UserService {
  // eslint-disable-next-line class-methods-use-this

  /**
   * Sign UP
   * @param {Object} userObject
   * @returns {Object} { user }
   */
  async signUp(requestContext) {
    try {
      // validates request body
      const body = await userValidator.signUp(requestContext);
      // check if user exist
      const userExist = await userRepository.getUser({ email: body.email });
      if (userExist)
        errorResponse(
          RESPONSETYPES.ERROR.USER_EXIST.message,
          STATUSCODE.bad_request
        );
      const hashedPassword = bcrypt.hashSync(requestContext.password);
      body.password = hashedPassword;
      const data = await userRepository.createUser({ body });
      delete data.password;
      return data;
    } catch (error) {
      return error;
    }
  }

  /**
   * Sign In
   * @param {Object} userObject
   * @returns {Object} { user, token }
   */
  async logIn(requestContext) {
    try {
      if (requestContext.email == null || requestContext.password == null) {
        throw new Error("Please provide both username and password!");
      }
      // validates request body
      const body = await userValidator.login(requestContext);
      // check if user exist
      const userExist = await userRepository.getUser({ email: body.email });
      if (!userExist) throw new Error(RESPONSETYPES.ERROR.USER_DOES_NOT_EXIST);
      userExist.last_login = new Date();
      const token = authTokenHelper.generateToken({
        userId: userExist._id,
        role: userExist.role,
      });
      userExist.token = token;
      const data = await userExist.save();
      return { user: data, token };
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get all users
   * @returns {Object} users
   */
  async fetchUsers() {
    try {
      //fetch all users
      const users = await userRepository.getUsers(
        {
          deleted: false,
          status: "ACTIVE",
        },
        "tags"
      );
      return users;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get single user
   * @param {String} userId
   * @returns {Object} user
   */
  async getUser(requestContext) {
    try {
      // validates request body
      const body = await userValidator.getUser(requestContext);
      // get a user
      const users = await userRepository.getUser(
        {
          _id: requestContext.userId,
          deleted: false,
          status: "ACTIVE",
        },
        "tags"
      );
      return users;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Edit user infomation
   * @param {Object} user
   * @param {Object} editUser
   * @returns {Object} updatedUser
   */
  async editUser(userId, requestContext) {
    try {
      // validates request body
      const body = await userValidator.updateUsers(requestContext);
      const users = await userRepository.editUser(userId, body);
      return users;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Delete user infomation
   * @param {String} user
   * @returns {Object} response
   */

  async deleteUser(requestContext) {
    //In prod enviroment, This should be a soft delete because we dont want to loose data can be useful for metrics and other purposes
    try {
      // validates request body
      const body = await userValidator.deleteUser(requestContext);
      const users = await userRepository.deleteUser(body.userId);
      return users;
    } catch (error) {
      throw error;
    }
  }
}

const userService = new UserService();
module.exports = userService;
