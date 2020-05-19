import { objectType } from "@nexus/schema";

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
  },
});
