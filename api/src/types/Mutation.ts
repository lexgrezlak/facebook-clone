import { intArg, objectType, stringArg } from "@nexus/schema";
import { compare, hash } from "bcryptjs";
import {
  requiredDateTimeArg,
  requiredGenderArg,
  requiredStringArg,
} from "./helpers";
import { AuthenticationError, UserInputError } from "apollo-server-express";
import { clearCookie, generateToken, setCookie } from "../utils/cookies";
import { trimAndCapitalizeSentence } from "../utils/helpers";

export const Mutation = objectType({
  name: "Mutation",
  definition(t) {
    t.field("signUp", {
      type: "User",
      args: {
        // empty object so it doesn't trigger ts error
        // the option required is already set
        firstName: requiredStringArg({}),
        lastName: requiredStringArg({}),
        email: requiredStringArg({}),
        password: requiredStringArg({}),
        // types are already given therefore:
        // @ts-ignore
        birthday: requiredDateTimeArg(),
        // @ts-ignore
        gender: requiredGenderArg(),
      },
      resolve: async (
        _parent,
        { firstName, lastName, password, email, ...rest },
        context
      ) => {
        email = email.toLowerCase();
        firstName = trimAndCapitalizeSentence(firstName);
        lastName = trimAndCapitalizeSentence(lastName);

        const passwordHash = await hash(password, 10);
        const user = await context.prisma.user.create({
          data: {
            passwordHash,
            firstName,
            lastName,
            email,
            ...rest,
          },
        });

        const token = generateToken({ userId: user.id });
        setCookie(context.res, token);

        return user;
      },
    });

    t.field("signOut", {
      type: "Boolean",
      resolve: (_parent, _args, context) => {
        clearCookie(context.res);
        return true;
      },
    });

    t.field("signIn", {
      type: "User",
      args: {
        email: requiredStringArg({}),
        password: requiredStringArg({}),
      },
      resolve: async (_parent, { email, password }, context) => {
        email = email.toLowerCase();
        const user = await context.prisma.user.findOne({ where: { email } });
        if (!user) return new AuthenticationError("Invalid email or password");

        const isPasswordValid = await compare(password, user.passwordHash);
        if (!isPasswordValid)
          return new AuthenticationError("Invalid email or password");

        const token = generateToken({ userId: user.id });
        setCookie(context.res, token);

        return user;
      },
    });

    t.field("createPost", {
      type: "Post",
      nullable: true,
      args: {
        content: stringArg({ nullable: false }),
      },
      resolve: (_parent, { content }, context) => {
        const userId = context.req.userId;
        return context.prisma.post.create({
          data: {
            content,
            author: { connect: { id: Number(userId) } },
          },
        });
      },
    });

    t.field("deletePost", {
      type: "Post",
      nullable: true,
      args: {
        id: intArg({ required: true }),
      },
      resolve: (_parent, { id }, context) => {
        return context.prisma.post.delete({ where: { id } });
      },
    });

    t.field("sendInvitation", {
      type: "FriendStatus",
      nullable: true,
      args: {
        id: intArg({ required: true }),
      },
      resolve: async (_parent, { id: receiverId }, context) => {
        const { userId: senderId } = context.req;
        if (senderId === receiverId)
          return new UserInputError("You can't send an invitation to yourself");

        try {
          return await context.prisma.friendStatus.create({
            data: {
              sender: { connect: { id: senderId } },
              receiver: { connect: { id: receiverId } },
            },
          });
        } catch (error) {
          return new Error(error.message);
        }
      },
    });

    t.field("acceptInvitation", {
      type: "FriendStatus",
      nullable: true,
      args: {
        id: intArg({ required: true }),
      },
      resolve: async (_parent, { id: senderId }, context) => {
        const { userId: receiverId } = context.req;

        // error while trying
        // context.prisma.friendStatus.update({fromUserId: ..., toUserId: ...}, data: {...})
        // likely due to a bug - I found an issue from March on github
        // so I did a work-around
        const [invite] = await context.prisma.friendStatus.findMany({
          where: {
            fromUserId: senderId,
            toUserId: receiverId,
            statusId: 2,
          },
        });

        return context.prisma.friendStatus.update({
          where: { id: invite.id },
          data: { responseTime: new Date(), statusId: 1 },
        });
      },
    });

    t.field("removeFriendship", {
      type: "Boolean",
      nullable: false,
      args: {
        id: intArg({ required: true }),
      },
      resolve: async (_parent, { id }, context) => {
        const { userId } = context.req;

        try {
          await context.prisma.friendStatus.deleteMany({
            where: {
              statusId: 1,
              OR: [
                { fromUserId: userId, toUserId: id },
                { fromUserId: id, toUserId: userId },
              ],
            },
          });
          return true;
        } catch (error) {
          console.log(error);
          return false;
        }
      },
    });

    t.field("removeRequest", {
      type: "Boolean",
      nullable: false,
      args: {
        id: intArg({ required: true }),
      },
      resolve: async (_parent, { id }, context) => {
        const { userId } = context.req;

        try {
          await context.prisma.friendStatus.deleteMany({
            where: {
              statusId: 2,
              fromUserId: userId,
              toUserId: id,
            },
          });

          return true;
        } catch (error) {
          return new Error(error);
        }
      },
    });
  },
});
