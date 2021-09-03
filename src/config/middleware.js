const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morganLogger = require('morgan');
const appLogger = require('../helpers/logger');
const authTokenHelper = require('../helpers/auth-token.helper');

const app = express.Router();

app.use(cors());

app.use((req, res, next) => authTokenHelper.verifyToken(req, res, next));
app.use(helmet({ contentSecurityPolicy: false }));
app.use(morganLogger('combined', { stream: appLogger.stream }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

module.exports = app;
