import { intArg, objectType, stringArg } from "@nexus/schema";
import { compare, hash } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { JWT_SECRET } from "../config";
import {
  requiredDateTimeArg,
  requiredGenderArg,
  requiredStringArg,
} from "./helpers";
import { AuthenticationError } from "apollo-server-express";
import { clearCookie, generateToken, setCookie } from "../utils/cookies";

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
      resolve: async (_parent, { password, ...rest }, context) => {
        const passwordHash = await hash(password, 10);
        const user = await context.prisma.user.create({
          data: {
            passwordHash,
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
        const user = await context.prisma.user.findOne({ where: { email } });
        if (!user) throw new AuthenticationError("Invalid email or password");

        const isPasswordValid = await compare(password, user.passwordHash);
        if (!isPasswordValid)
          throw new AuthenticationError("Invalid email or password");

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
        const userId = context.req.userId || "";
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
        id: intArg({ nullable: false }),
      },
      resolve: (_parent, { id }, context) => {
        return context.prisma.post.delete({ where: { id } });
      },
    });
  },
});
