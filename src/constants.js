const STATUS = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
};
const USERTYPE = {
  CONTRACTOR: 'CONTRACTOR',
  EMPLOYEE: 'EMPLOYEE',
};
const RESPONSETYPES = {
  ERROR: {
    USER_EXIST: 'user already exist',
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
};
