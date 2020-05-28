import { createTestServer } from "../testUtils";
import { createTestClient } from "apollo-server-testing";
import { SIGN_IN, SIGN_OUT, SIGN_UP } from "../../../app/src/graphql/queries";
import bcryptjs, { compare, hash } from "bcryptjs";
import { sign } from "jsonwebtoken";
import prisma from "../utils/mocks/prisma";
import { clearCookie, generateToken, setCookie } from "../utils/cookies";

const HASH_RESPONSE = "hashedPassword";
const TOKEN_RESPONSE = "token1234";

jest.mock("../utils/cookies", () => ({
  setCookie: jest.fn(function () {}),
  generateToken: jest.fn(() => Promise.resolve(TOKEN_RESPONSE)),
  clearCookie: jest.fn(() => Promise.resolve()),
}));

jest.mock("bcryptjs", () => ({
  hash: jest.fn(() => Promise.resolve(HASH_RESPONSE)),
  compare: jest.fn(() => Promise.resolve(true)),
}));

const context = ({ req, res }: any) => {
  return { req, res, prisma };
};
const server = createTestServer(context);
const { mutate } = createTestClient(server);

describe("sign up", function () {
  it("should call hash, generateToken, prisma.user.create", async () => {
    const user = {
      firstName: "testN",
      lastName: "dsa",
      email: "testE",
      birthday: new Date(),
      password: "testPass123",
      gender: "MALE",
    };

    await mutate({
      mutation: SIGN_UP,
      variables: user,
    });

    const { password, ...rest } = user;

    expect(hash).toBeCalledWith(user.password, 10);
    expect(prisma.user.create).toBeCalledWith({
      data: {
        ...rest,
        passwordHash: HASH_RESPONSE,
      },
    });
    expect(generateToken).toBeCalled();
  });
});

describe("sign in", function () {
  it("should call prisma.user.findOne, compare, sign", async function () {
    const credentials = {
      email: "hello",
      password: "secret",
    };

    await mutate({
      mutation: SIGN_IN,
      variables: credentials,
    });

    expect(prisma.user.findOne).toBeCalledWith({
      where: { email: credentials.email },
    });
    expect(compare).toBeCalled();
    expect(generateToken).toBeCalled();
    expect(setCookie).toBeCalled();
  });

  it("should throw an error when user not found", async function () {
    prisma.user.findOne.mockImplementationOnce(() => Promise.resolve(null));

    const res = await mutate({
      mutation: SIGN_IN,
      variables: {
        email: "Testable8",
        password: "Testable9",
      },
    });

    expect(res.errors!.length).toBeTruthy();
    expect(res.data).toBeFalsy();
  });

  it("should throw an error when passwords don't match", async function () {
    jest
      .spyOn(bcryptjs, "compare")
      .mockImplementationOnce(() => Promise.resolve(false));

    const res = await mutate({
      mutation: SIGN_IN,
      variables: {
        email: "The@email.com",
        password: "TestingIsEasy1",
      },
    });

    expect(res.errors!.length).toBeTruthy();
    expect(res?.data).toBeFalsy();
  });
});

describe("sign out", function () {
  it("should call clearCookie and return true", async function () {
    const res = await mutate({
      mutation: SIGN_OUT,
    });

    expect(clearCookie).toBeCalled();
    expect(res.data!.signOut).toBe(true);
  });
});
