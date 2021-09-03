const { userService } = require('../services/users');

exports.signUp = async ({ reqContext }) => {
  try {
    const user = await userService.signUp(reqContext);
    return user;
  } catch (error) {
    throw new Error(error.msg || error.message);
  }
};

exports.login = async ({ reqContext }) => {
  try {
    const user = await userService.logIn(reqContext);
    return user;
  } catch (error) {
    throw new Error(error.msg || error.message);
  }
};
exports.fetchUsers = async () => {
  try {
    const user = await userService.fetchUsers();
    return user;
  } catch (error) {
    throw new Error(error.msg || error.message);
  }
};

exports.editUser = async ({ userId, reqContext }) => {
  try {
    const user = await userService.editUser(userId, reqContext);
    return user;
  } catch (error) {
    throw new Error(error.msg || error.message);
  }
};

exports.deleteUser = async ({ reqContext }) => {
  try {
    const user = await userService.deleteUser(reqContext);
    return user;
  } catch (error) {
    throw new Error(error.msg || error.message);
  }
};
