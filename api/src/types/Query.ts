import { objectType, stringArg } from "@nexus/schema";
import { getUserId } from "../utils";

export const Query = objectType({
  name: "Query",
  definition(t) {
    t.field("me", {
      type: "User",
      nullable: true,
      resolve: (_parent, _args, context) => {
        const userId = getUserId(context);
        if (!userId) return null;
        return context.prisma.user.findOne({ where: { id: Number(userId) } });
      },
    });

    t.list.field("allUsers", {
      type: "User",
      resolve: (_parent, _args, context) => {
        return context.prisma.user.findMany();
      },
    });

    t.list.field("feed", {
      type: "Post",
      resolve: (_parent, _args, context) => {
        return context.prisma.post.findMany();
      },
    });

    t.list.field("filterPosts", {
      type: "Post",
      args: {
        searchString: stringArg({ nullable: true }),
      },
      resolve: (_parent, { searchString }, context) => {
        return context.prisma.post.findMany({
          where: {
            OR: [{ content: { contains: searchString } }],
          },
        });
      },
    });
  },
});
