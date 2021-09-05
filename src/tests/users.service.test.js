const {
  MockUserRequestPayload,
  MockUserResponsePayload,
} = require("./mock-payload");
const UserRepository = require("../repositories/User.repository");
const { userService } = require("../services/users");
jest.mock("../repositories/User.repository.js");
const mockFetchUsers = jest.fn();
mockFetchUsers.mockResolvedValue(MockUserResponsePayload);
UserRepository.getUsers = mockFetchUsers;
/**
 * The unit tests for tagsServices is being done in Isolation
 * without a connection to any database or other components of the codebase.
 *
 * The pattern being used here is called arrange-act-assert (AAA).
 * Its used to make the test cleaner by the different actions being taken into different sections based on what they do.
 * https://medium.com/@pjbgf/title-testing-code-ocd-and-the-aaa-pattern-df453975ab80
 */

describe("Records Service Function", () => {
  afterEach(() => jest.clearAllMocks());

  beforeEach(() => UserRepository.getUsers.mockImplementation(jest.fn()));
  it("should throw an error due to an empty request body and create hobbies repository method should not have been called", async () => {
    // Arrange
    UserRepository.createUser.mockResolvedValue(MockUserResponsePayload);
    const requestContext = {
      body: {},
    };

    try {
      // Act
      await userService.signUp(requestContext);
    } catch (e) {
      // Assert
      expect(e.message.length).not.toBe(null);
      expect(UserRepository.createUser).toHaveBeenCalledTimes(0);
    }
  });

  it("should throw an error due to a required field missing and the records repository function should not have been called", async () => {
    // Arrange
    UserRepository.createUser.mockResolvedValue(MockUserResponsePayload);
    // We need a clone so as to keep the records payload immutable so it doesn't affect subsequent tests
    const cloneRequestPayload = { ...MockUserRequestPayload };
    delete cloneRequestPayload.email;
    const requestContext = {
      body: cloneRequestPayload,
    };

    try {
      // Act
      await userService.signUp(requestContext);
    } catch (e) {
      // Assert
      expect(e.message.length).not.toBe(null);
      expect(UserRepository.createUser).toHaveBeenCalledTimes(0);
    }
  });

  it("should throw an error due to a bad value for a field and the records repository function should not have been called", async () => {
    // Arrange
    UserRepository.createUser.mockResolvedValue(MockUserResponsePayload);
    // We need a clone so as to keep the records payload immutable so it doesn't affect subsequent tests
    const cloneRequestPayload = { ...MockUserRequestPayload };
    cloneRequestPayload.email = "sundfde"; // Simulate a wrong value
    const requestContext = {
      body: cloneRequestPayload,
    };

    try {
      // Act
      await userService.signUp(requestContext);
    } catch (e) {
      // Assert
      expect(e.message.length).not.toBe(null);
      expect(UserRepository.createUser).toHaveBeenCalledTimes(0);
    }
  });

  it("should throw an error due to a bad value for a field and the records repository function should not have been called", async () => {
    // Arrange
    UserRepository.createUser.mockResolvedValue(MockUserResponsePayload);
    // We need a clone so as to keep the records payload immutable so it doesn't affect subsequent tests
    const cloneRequestPayload = { ...MockUserRequestPayload };

    const requestContext = {
      body: cloneRequestPayload,
    };

    try {
      // Act
      await userService.signUp(requestContext.body);
    } catch (e) {
      // Assert
      expect(e.message.length).toBe(null);
      expect(UserRepository.getUser).toHaveBeenCalledTimes(0);
    }
  });
});
