const { tagsService } = require('../services/tags');

exports.createTags = async ({ reqContext }) => {
  try {
    const user = await tagsService.createTags(reqContext);
    return user;
  } catch (error) {
    throw new Error(error.msg || error.message);
  }
};

exports.fetchTags = async () => {
  try {
    const tags = await tagsService.fetchTags();
    return tags;
  } catch (error) {
    throw new Error(error.msg || error.message);
  }
};

exports.editTag = async ({ reqContext }) => {
  try {
    const user = await tagsService.editTag(reqContext);
    return user;
  } catch (error) {
    throw new Error(error.msg || error.message);
  }
};

exports.deleteTags = async ({ reqContext }) => {
  try {
    const user = await tagsService.deleteTags(reqContext);
    return user;
  } catch (error) {
    throw new Error(error.msg || error.message);
  }
};
