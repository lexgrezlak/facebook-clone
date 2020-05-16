import { objectType, stringArg } from "@nexus/schema";

export const Query = objectType({
  name: "Query",
  definition(t) {
    t.crud.post();

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
