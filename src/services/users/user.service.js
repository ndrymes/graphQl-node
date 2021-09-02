/* eslint-disable no-useless-catch */
/* eslint-disable no-undef */
const bcrypt = require('bcryptjs');
const { userRepository } = require('../../repositories');
const userValidator = require('./users.validators');
const { RESPONSETYPES } = require('../../constants');

class UserService {
  // eslint-disable-next-line class-methods-use-this
  async signUp(requestContext) {
    try {
      // validates request body
      const body = await userValidator.signUp(requestContext);
      // check if user exist
      const userExist = await userRepository.getUser({ body: requestContext });
      console.log({ userExist });
      if (userExist) throw new Error(RESPONSETYPES.ERROR.USER_EXIST);
      const hashedPassword = bcrypt.hashSync(requestContext.password);
      body.password = hashedPassword;
      const data = await userRepository.createUser({ body });
      delete data.password;
      return data;
    } catch (error) {
      throw error;
    }
  }
}

const userService = new UserService();
module.exports = userService;
