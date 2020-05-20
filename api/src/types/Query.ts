import { objectType } from "@nexus/schema";
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
