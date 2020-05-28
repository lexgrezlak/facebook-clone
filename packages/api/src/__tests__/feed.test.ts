import prisma from "../utils/mocks/prisma";
import { createTestServer } from "../testUtils";
import { createTestClient } from "apollo-server-testing";
import { GET_FEED } from "../../../app/src/graphql/queries";

const context = ({ req, res }: any) => {
  return { req, res, prisma };
};
const server = createTestServer(context);
const { mutate, query } = createTestClient(server);

describe("feed", () => {
  it("should call prisma.post.findMany with orderBy option", async function () {
    await query({ query: GET_FEED });
    expect(prisma.post.findMany).toBeCalledWith({
      orderBy: { createdAt: "desc" },
    });
  });
});
