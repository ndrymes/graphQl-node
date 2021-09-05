jest.setTimeout(15000);
const mongoose = require("mongoose");
const appCore = require("../../app");
const { graphql } = require("graphql");
const schema = require("../../schema/index");
const { seedDB } = require("./test.setup");
const { users } = require("../mock-payload");

const context = {
  isAuth: false,
  // userObject: req.userObject,
  authErrorMsg: "heree",
};

describe("User Controller", () => {
  // Close the server to avoid memory leaks
  afterAll(() => mongoose.disconnect());
  beforeAll(async () => {
    await appCore();
    await seedDB({ users });
  });

  describe("SignUp", () => {
    it("should signup a user and return a user details ", async () => {
      const query = `mutation{
        signUp(email:"sunmonuoluwole@yahoo.com", password:"233$%%4##", role:"software Engineer", userType:"CONTRACTOR"){
          email,
          role
          userType
        }
      }
      `;
      const data = await graphql(schema, query, null, context, {});
      //expect(data.data.signUp).to.be.an('object');
      expect(data.data.signUp.email).toBe("sunmonuoluwole@yahoo.com");
      expect(data.data.signUp.userType).toBe("CONTRACTOR");
    });

    it("should throw an error if user sends invalid request body ", async () => {
      const query = `mutation{
      signUp(email:"sunmonuoluwoleyahoo.com", password:"233$%%4##", role:"software Engineer", userType:"CONTRACTOR"){
        email,
        role
        userType
      }
    }
    `;
      const data = await graphql(schema, query, null, context, {});
      expect(data.errors[0].message).toBe('"email" must be a valid email');
    });
  });

  describe("Login", () => {
    it("should login a user and return  user details ", async () => {
      const query = `mutation{
        login(email:"sunmonuoluwole@yahoo.com", password:"233$%%4##"){
          user{
            email
           userType
          }
       token
        }
      } `;
      const data = await graphql(schema, query, null, context, {});
      expect(data.data.login.user.email).toBe("sunmonuoluwole@yahoo.com");
      expect(data.data.login.user.userType).toBe("CONTRACTOR");
      expect(data.data.login).toHaveProperty("token");
    });

    it("should throw an error if user sends invalid request body ", async () => {
      const query = `mutation{
      login(email:"sunmonuoluwoleyahoo.com", password:"233$%%4##"){
        user{
          email
         userType
        }
     token
      }
    }
    `;
      const data = await graphql(schema, query, null, context, {});
      expect(data.errors[0].message).toBe('"email" must be a valid email');
    });
  });
});
