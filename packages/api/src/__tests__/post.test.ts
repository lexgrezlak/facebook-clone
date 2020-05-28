import prisma from "../utils/mocks/prisma";
import { createTestServer } from "../testUtils";
import { createTestClient } from "apollo-server-testing";
import { CREATE_POST } from "../../../app/src/graphql/queries";

const context = ({ req, res }: any) => {
  return { req, res, prisma };
};
const server = createTestServer(context);
const { mutate, query } = createTestClient(server);

describe("create post", function () {
  it("should throw an error when not authenticated", async function () {
    const postData = {
      content: "test content",
    };
    const res = await mutate({
      mutation: CREATE_POST,
      variables: postData,
    });

    expect(res.errors!.length).toBeTruthy();
    expect(res.data!.createPost).toBeFalsy();
  });
});
