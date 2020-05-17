import { createTestServer } from "../testUtils";
import { createTestClient } from "apollo-server-testing";
import { GET_ME } from "../../../app/src/queries";
import { getUserId } from "../utils";

jest.mock("../utils", () => ({
  getUserId: jest.fn(() => Promise.resolve(32)),
}));

let prisma = {
  user: {
    findOne: jest.fn((args) => Promise.resolve({ ...args })),
  },
};

const context = ({ req }: any) => ({ req, prisma });
const server = createTestServer(context);
const { query } = createTestClient(server);

describe("me", function () {
  it("should call getUserId, prisma.user.findOne", async function () {
    const res = await query({
      query: GET_ME,
    });

    expect(getUserId).toBeCalled();
    expect(prisma.user.findOne).toBeCalled();
  });
});
