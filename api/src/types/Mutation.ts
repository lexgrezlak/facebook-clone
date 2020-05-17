import { intArg, objectType, stringArg } from "@nexus/schema";
import { compare, hash } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { JWT_SECRET } from "../config";

export const Mutation = objectType({
  name: "Mutation",
  definition(t) {
    t.field("signUp", {
      type: "AuthPayload",
      args: {
        name: stringArg({ nullable: false }),
        email: stringArg({ nullable: false }),
        password: stringArg({ nullable: false }),
      },
      resolve: async (_parent, { name, email, password }, ctx) => {
        const passwordHash = await hash(password, 10);
        const user = await ctx.prisma.user.create({
          data: {
            name,
            email,
            passwordHash,
          },
        });

        const token = sign({ userId: user.id }, JWT_SECRET);

        return { token, user };
      },
    });

    t.field("signIn", {
      type: "AuthPayload",
      args: {
        email: stringArg({ nullable: false }),
        password: stringArg({ nullable: false }),
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
  },
});
