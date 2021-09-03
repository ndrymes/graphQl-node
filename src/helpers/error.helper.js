/**
 * The response helper is used to return errors
 * It also helps return the correct status code.
 *
 * This functions are important because they helps put the response logic in one place,
 * this makes it much easier to manage and helps keep the code DRY.
 *
 * @module ResponseHelpr
 */

const responseCodes = {
  success: 0,
  badRequest: 1000,
  resourceCreationError: 1001,
  resourceFetchError: 1002,
  resourceUpdateError: 1003,
};

/**
 * @param {object} responseObject - The expressjs response object
 * @param {object} errorObject - A javascript Error object
 * @param {number} statusCode - The http status code to return
 * @param data - Any extra data to be passed with the error response
 * @return response object
 */
const errorResponse = (errorMessage = '', statusCode) => {
  const err = new Error(errorMessage);
  err.statusCode = statusCode;
  throw err;
};

exports.responseHelper = {
  errorResponse,
  responseCodes,
};
