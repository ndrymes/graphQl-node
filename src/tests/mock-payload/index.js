const {
  Types: { ObjectId },
} = require("mongoose");
const MockUserResponsePayload = {
  _id: "61136f57a3190a0821361e24",
  email: "sunmonuoluwole@gmail.com",
  password: "wolex",
  status: "ACTIVE",
  duration: 1,
  createdAt: "2021-08-11T06:33:59.136Z",
  updatedAt: "2021-08-11T06:33:59.136Z",
  __v: 0,
};

const MockUserRequestPayload = {
  email: "sunmonuoluwole@gmail.com",
  password: "@3443454",
  userType: "CONTRACTOR",
  role: "Software engineer",
};
const user1 = {
  _id: ObjectId("6ee21587e07f053f990cebb5"),
  email: "sunmonuoluwole@gmail.com",
  password: "@3443454",
  userType: "CONTRACTOR",
  role: "Software engineer",
};

const user2 = {
  _id: ObjectId("6130ed453fe50a0fb536297c"),
  email: "sunmonuoluwole@outlook.com",
  password: "@3443454",
  userType: "CONTRACTOR",
  role: "Software engineer",
};

const users = [user1, user2];
module.exports = {
  MockUserResponsePayload,
  MockUserRequestPayload,
  users,
};
