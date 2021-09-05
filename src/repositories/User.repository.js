/* eslint-disable class-methods-use-this */
const userModel = require("../models/user.model");

class UserRepository {
  // persist user in the database
  async createUser({ body }) {
    return userModel.create(body);
  }

  // fetch single user from the database
  async getUser(body, populate = "") {
    return userModel.findOne(body).populate(populate);
  }

  // fetch all users from the database
  async getUsers(body, populate = "") {
    return userModel.find(body).populate(populate);
  }

  // update a user in the database
  async editUser(id, body) {
    return userModel.findOneAndUpdate({ _id: id }, body, { new: true });
  }

  // delete a user from the database
  async deleteUser(userId) {
    return userModel.findOneAndDelete({ _id: userId });
  }
}

const userRepository = new UserRepository();
module.exports = userRepository;
