import { intArg, makeSchema, objectType, stringArg } from "@nexus/schema";
import { nexusPrismaPlugin } from "nexus-prisma";

const User = objectType({
  name: "User",
  definition(t) {
    t.model.id();
    t.model.name();
    t.model.email();
    t.model.posts({ pagination: false });
  },
});

const Post = objectType({
  name: "Post",
  definition(t) {
    t.model.id();
    t.model.title();
    t.model.content();
    t.model.published();
    t.model.author();
  },
});

const Query = objectType({
  name: "Query",
  definition(t) {
    t.crud.post();

    t.list.field("feed", {
      type: "Post",
      resolve: (_parent, _args, context) => {
        return context.prisma.post.findMany({ where: { published: true } });
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
            OR: [
              { title: { contains: searchString } },
              { content: { contains: searchString } },
            ],
          },
        });
      },
    });
  },
});

const Mutation = objectType({
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

export const schema = makeSchema({
  types: [Query, Mutation, User, Post],
  plugins: [nexusPrismaPlugin()],
  outputs: {
    schema: __dirname + "./schema.graphql",
    typegen: __dirname + "/generated/nexus.ts",
  },
  typegenAutoConfig: {
    contextType: "Context.Context",
    sources: [
      {
        source: "@prisma/client",
        alias: "prisma",
      },
      {
        source: require.resolve("./context"),
        alias: "Context",
      },
    ],
  },
});
