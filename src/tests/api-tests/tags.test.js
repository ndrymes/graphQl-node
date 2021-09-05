jest.setTimeout(15000);
const mongoose = require("mongoose");
const appCore = require("../../app");
const { graphql } = require("graphql");
const schema = require("../../schema/index");
const { users } = require("../mock-payload");

describe("Tag Controller", () => {
  // Close the server to avoid memory leaks
  afterAll(() => mongoose.disconnect());
  beforeAll(async () => {
    await appCore();
  });

  describe("create", () => {
    it("should create a tag and return tag details ", async () => {
      const query = `
      mutation{
        createTags(name:"football", description:"Soccer played on the field"){
          name
          description
        }
      }
      `;
      const context = {
        isAuth: true,
        // userObject: req.userObject,
        authErrorMsg: "Not authorized",
      };
      const data = await graphql(schema, query, null, context, {});
      expect(data.data.createTags.name).toBe("football");
      expect(data.data.createTags.description).toBe(
        "Soccer played on the field"
      );
    });

    it("should create a tag and return tag details ", async () => {
      const query = `
        mutation{
          createTags( description:"Soccer played on the field"){
            name
            description
          }
        }
        `;
      const context = {
        isAuth: true,
        // userObject: req.userObject,
        authErrorMsg: "Not authorized",
      };
      const data = await graphql(schema, query, null, context, {});
      expect(data.errors[0].message).toBe('"name" is required');
    });
  });

  describe("fetch Tags", () => {
    it("should login a user and return  user details ", async () => {
      const query = `query{
        fetchTags{
          name
          description
        }
      }`;
      const context = {
        isAuth: true,
        // userObject: req.userObject,
        authErrorMsg: "Not authorized",
      };
      const data = await graphql(schema, query, null, context, {});
      expect(data.data.fetchTags[0].name).toBe("football");
      expect(data.data.fetchTags[0].description).toBe(
        "Soccer played on the field"
      );
    });
  });
});
