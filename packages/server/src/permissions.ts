import { Chat } from "./entity/Chat";
import { Post } from "./entity/Post";
import { Context } from "./context";
import { allow, and, rule, shield } from "graphql-shield";
import {
  UserInputError,
  ForbiddenError,
  AuthenticationError,
} from "apollo-server-express";

const rules = {
  isChatMember: rule()(async (parent, { chatId }, ctx: Context) => {
    const { userId } = ctx.req;
    const chat = await Chat.findOne(chatId, { relations: ["users"] });

    const memberIds = chat.users.map((user) => user.id);
    const isMember = memberIds.includes(userId);

    return isMember || new ForbiddenError("You are not the chat member");
  }),
  isAuthenticated: rule()((parent, args, context) => {
    return (
      !!context.req.userId ||
      new AuthenticationError("You are not authenticated")
    );
  }),
  isPostOwner: rule()(async (parent, { id }, context) => {
    const userId = context.req.userId || "";
    const post = await Post.findOne({
      where: { id },
    });

    return (
      userId !== post.userId || new ForbiddenError("You are not the post owner")
    );
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
    createMessage: and(rules.isAuthenticated, rules.isChatMember),
  },
});
