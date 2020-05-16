import { intArg, objectType, stringArg } from "@nexus/schema";

export const Mutation = objectType({
  name: "Mutation",
  definition(t) {
    t.crud.createOneUser({ alias: "signUpUser" });
    t.crud.deleteOnePost();

    t.field("createDraft", {
      type: "Post",
      args: {
        title: stringArg({ nullable: false }),
        content: stringArg(),
        authorEmail: stringArg(),
      },
      resolve: (_parent, { title, content, authorEmail }, context) => {
        return context.prisma.post.create({
          data: {
            title,
            content,
            published: false,
            author: {
              connect: { email: authorEmail },
            },
          },
        });
      },
    });

    t.field("publish", {
      type: "Post",
      nullable: true,
      args: {
        id: intArg(),
      },
      resolve: (_parent, { id }, context) => {
        return context.prisma.post.update({
          where: { id: Number(id) },
          data: {
            published: true,
          },
        });
      },
    });
  },
});
