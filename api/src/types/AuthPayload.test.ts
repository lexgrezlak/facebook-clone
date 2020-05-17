import { createTestServer } from "../testUtils";
import { createTestClient } from "apollo-server-testing";
import { gql } from "apollo-server-express";
import { SIGN_IN, SIGN_UP } from "../../../app/src/queries";
import { compare, hash } from "bcryptjs";
import { sign } from "jsonwebtoken";

jest.mock("bcryptjs", () => ({
  hash: jest.fn(() => Promise.resolve("hashed")),
  compare: jest.fn(() => Promise.resolve(true)),
}));

jest.mock("jsonwebtoken", () => ({
  sign: jest.fn(() => "token"),
}));

let prisma = {
  user: {
    create: jest.fn((args) => Promise.resolve({ ...args })),
    findOne: jest.fn((args) => Promise.resolve({ ...args })),
  },
};

const context = ({ req }: any) => ({ req, prisma });
const server = createTestServer(context);
const { mutate } = createTestClient(server);

describe("sign up", function () {
  it("should call prisma.user, hash, compare", async () => {
    const res = await mutate({
      mutation: SIGN_UP,
      variables: {
        name: "testName",
        email: "testEmail",
        password: "testPassword",
      },
    });

    console.log(res);

    expect(prisma.user.create).toBeCalled();
    expect(hash).toBeCalled();
    expect(sign).toBeCalled();

    expect(res?.data?.signIn?.token.toBeTruthy());
    expect(res?.data?.signIn?.user.toBeTruthy());
  });
});

describe("sign in", function () {
  it("should call prisma.user.findOne, compare, sign", async function () {
    const res = await mutate({
      mutation: SIGN_IN,
      variables: {
        email: "hello",
        password: "secret",
      },
    });

    expect(prisma.user.findOne).toBeCalled();
    expect(compare).toBeCalled();
    expect(sign).toBeCalled();
  });
});
