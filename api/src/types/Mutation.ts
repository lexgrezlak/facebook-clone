import { intArg, objectType, stringArg } from "@nexus/schema";
import { compare, hash } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { JWT_SECRET } from "../config";
import { getUserId } from "../utils";
import {
  requiredDateTimeArg,
  requiredGenderArg,
  requiredStringArg,
} from "./helpers";

export const Mutation = objectType({
  name: "Mutation",
  definition(t) {
    t.field("signUp", {
      type: "AuthPayload",
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
      resolve: async (_parent, { password, ...rest }, ctx) => {
        const passwordHash = await hash(password, 10);
        try {
          const user = await ctx.prisma.user.create({
            data: {
              passwordHash,
              ...rest,
            },
          });
        } catch (e) {
          console.log(e);
        }

        const token = sign({ userId: user.id }, JWT_SECRET);

        return { token, user };
      },
    });

    t.field("signIn", {
      type: "AuthPayload",
      args: {
        email: requiredStringArg({}),
        password: requiredStringArg({}),
      },
      resolve: async (_parent, { email, password }, ctx) => {
        const user = await ctx.prisma.user.findOne({ where: { email } });

        // user not found
        if (!user) throw new Error("Invalid password");

        const isPasswordValid = await compare(password, user.passwordHash);
        if (!isPasswordValid) throw new Error("Invalid password");

        const token = sign({ userId: user.id }, JWT_SECRET);

        return {
          token,
          user,
        };
      },
    });

    t.field("createPost", {
      type: "Post",
      nullable: true,
      args: {
        content: stringArg({ nullable: false }),
      },
      resolve: (_parent, { content }, context) => {
        const userId = getUserId(context);
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
