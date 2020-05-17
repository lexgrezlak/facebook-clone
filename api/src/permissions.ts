import { rule, shield } from "graphql-shield";
import { getUserId } from "./utils";

const rules = {
  isAuthenticatedUser: rule()((_parent, _args, context) => {
    const userId = getUserId(context);
    return Boolean(userId);
  }),
  isPostOwner: rule()(async (_parent, { id }, context) => {
    const userId = getUserId(context);
    const post = await context.prisma.post.findOne({
      where: {
        id: Number(id),
      },
    });

    const { author } = post;

    return userId === author.id;
  }),
};

export const permissions = shield({
  Query: {
    feed: rules.isAuthenticatedUser,
  },
  Mutation: {
    createPost: rules.isAuthenticatedUser,
    deletePost: rules.isPostOwner,
  },
});
