const STATUS = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
};
const USERTYPE = {
  CONTRACTOR: 'CONTRACTOR',
  EMPLOYEE: 'EMPLOYEE',
};

const STATUSCODE = {
  bad_request: '400',
};
const RESPONSETYPES = {
  ERROR: {
    USER_EXIST: { message: 'user already exist', STATUSCODE: 400 },
    USER_DOES_NOT_EXIST: { message: 'invalid credentials', STATUSCODE: 400 },
    NOT_AUTHORIZED: {
      message: 'Not Authorized',
      STATUSCODE: 401,
    },
    TAG_EXIST: {
      message: 'The tag with this exact name exist',
      STATUSCODE: 401,
    },
    INVALID_ID: {
      message: 'Invaliv id provided',
      STATUSCODE: 401,
    },
  },
};
const STATUSVALUE = Object.values(STATUS);
const USERTYPEKEYS = Object.keys(USERTYPE);
const USERTYPEVALUES = Object.keys(USERTYPE);
const STATUSKEYS = Object.keys(STATUS);

module.exports = {
  STATUS,
  STATUSVALUE,
  STATUSKEYS,
  USERTYPEKEYS,
  RESPONSETYPES,
  USERTYPEVALUES,
  STATUSCODE,
};
