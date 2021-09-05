/* eslint-disable consistent-return */
/* eslint-disable class-methods-use-this */
const jwt = require("jsonwebtoken");
const envVars = require("../config/env-vars");
const {
  RESPONSETYPES: { ERROR },
} = require("./constants");

class AuthToken {
  generateToken({ userId, role, expiresIn = 1440 * 60 }) {
    return jwt.sign(
      {
        userId,
        role,
      },
      envVars.JSON_WEB_TOKEN,
      {
        expiresIn, // expires in 24 hours //input is in seconds
      }
    );
  }

  handleError(e) {
    const status = e.status ? e.status : 401;
    const message = e.message
      ? e.message
      : "An error occurred verifying your token";
    throw new Error(message);
  }

  fetchTokenFromJwtString(authHeader) {
    const token = authHeader;
    return token.substr(7);
  }

  getAccessTokenData(req, res, next) {
    if (req.headers.authorization == null) {
      req.isAuth = false;
      next();
    }
    const token = this.fetchTokenFromJwtString(req.headers.authorization);
    if (token == null) {
      req.authErrorMsg = ERROR.NOT_AUTHORIZED.message;
      return (req.isAuth = false);
    }
    const tokenContent = jwt.verify(token, process.env.JSON_WEB_TOKEN);
    const { userId, role } = tokenContent;
    return {
      userId,
      role,
    };
  }

  verifyToken(req, res, next) {
    try {
      const { userId, role } = this.getAccessTokenData(req, res, next);
      req.isAuth = true;
      req.userObject = {
        userId,
        role,
      };
      next();
    } catch (e) {
      if (
        e.name != null &&
        (e.name === "TokenExpiredError" || e.name === "JsonWebTokenError")
      ) {
        req.authErrorMsg = ERROR.NOT_AUTHORIZED.message;
        req.isAuth = false;
        next();
      }
      req.authErrorMsg = ERROR.NOT_AUTHORIZED.message;
      return (req.isAuth = false);
    }
  }
}

const authToken = new AuthToken();
module.exports = authToken;
