import { allow, and, rule, shield } from "graphql-shield";

const rules = {
  isAuthenticated: rule({ cache: "contextual" })((_parent, _args, context) => {
    return Boolean(context.req.userId);
  }),
  isPostOwner: rule()(async (_parent, { id }, context) => {
    const userId = context.req.userId || "";
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
    "*": rules.isAuthenticated,
    me: allow,
  },
  Mutation: {
    "*": rules.isAuthenticated,
    signIn: allow,
    signOut: allow,
    signUp: allow,
    deletePost: and(rules.isPostOwner, rules.isAuthenticated),
  },
});
