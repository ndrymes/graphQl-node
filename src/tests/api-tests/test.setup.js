const userSchema = require("../../models/user.model");

const seedDB = async ({ users }) => {
  try {
    return Promise.all([userSchema.insertMany(users)]);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  seedDB,
};
