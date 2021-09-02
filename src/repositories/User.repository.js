/* eslint-disable class-methods-use-this */
const userModel = require('../models/user.model');

class UserRepository {
  async createUser({ body }) {
    return userModel.create(body);
  }

  async getUser({ body }) {
    return userModel.findOne({ email: body.email });
  }
}

const userRepository = new UserRepository();
module.exports = userRepository;
