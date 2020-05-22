import { intArg, objectType } from "@nexus/schema";
import { requiredStringArg } from "./helpers";
import { trimAndCapitalizeSentence } from "../utils/helpers";

export const Query = objectType({
  name: "Query",
  definition(t) {
    t.field("me", {
      type: "User",
      nullable: true,
      resolve: async (_parent, _args, context) => {
        const id = context.req.userId || "";
        try {
          return await context.prisma.user.findOne({ where: { id } });
        } catch (error) {
          return null;
        }
      },
    });

    t.list.field("feed", {
      type: "Post",
      resolve: (_parent, _args, context) => {
        return context.prisma.post.findMany({ orderBy: { createdAt: "desc" } });
      },
    });

    t.list.field("users", {
      type: "User",
      args: { filter: requiredStringArg({}) },
      resolve: async (_parent, { filter }, context) => {
        filter = trimAndCapitalizeSentence(filter);
        const [firstName, lastName] = filter.split(" ");
        return context.prisma.user.findMany({
          where: {
            OR: [
              {
                firstName: { contains: firstName },
                lastName: { contains: lastName },
              },
              {
                firstName: { contains: lastName },
                lastName: { contains: firstName },
              },
            ],
          },
        });
      },
    });

    t.list.field("friends", {
      type: "User",
      nullable: true,
      args: { id: intArg({ nullable: true }) },
      resolve: async (_parent, _args, context) => {
        const userId = context.req.userId;
        const filteredStatuses = await context.prisma.friendStatus.findMany({
          where: {
            statusId: 1,
            OR: [{ toUserId: userId }, { fromUserId: userId }],
          },
        });

        const friendsIds = filteredStatuses.map((status) =>
          status.fromUserId === userId ? status.toUserId : status.fromUserId
        );

        const objectIds = friendsIds.map((id) => ({ id }));

        const friends = await context.prisma.user.findMany({
          where: {
            OR: objectIds,
          },
        });

        return friends;
      },
    });

    t.list.field("invitations", {
      type: "FriendStatus",
      resolve: async (_parent, _args, context) => {
        const userId = context.req.userId;
        return context.prisma.friendStatus.findMany({
          where: { toUserId: userId, statusId: 2 },
        });
      },
    });
  },
});
