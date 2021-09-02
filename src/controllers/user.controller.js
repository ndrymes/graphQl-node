const { userService } = require('../services/users');

exports.signUp = async ({ reqContext }) => {
  try {
    const users = await userService.signUp(reqContext);
    return users;
  } catch (error) {
    console.log(error);
    throw new Error(error.msg || error.message);
  }
};
