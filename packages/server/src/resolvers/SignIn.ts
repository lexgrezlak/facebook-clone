import { AuthenticationError } from "apollo-server-express";
import { compare } from "bcryptjs";
import { Context } from "./../context";
import { Mutation, Arg, Ctx, Resolver } from "type-graphql";
import { User } from "../entity/User";
import { generateToken, setCookie } from "../utils/cookies";

@Resolver()
export class SignInResolver {
  @Mutation(() => User, { nullable: true })
  async signIn(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() ctx: Context
  ): Promise<User | null> {
    const user = await User.findOne({ where: email });

    if (!user) throw new AuthenticationError("Wrong email or password");

    const isPasswordValid = await compare(password, user.passwordHash);

    if (!isPasswordValid)
      throw new AuthenticationError("Wrong email or password");

    const token = generateToken({ userId: user.id });
    setCookie(ctx.res, token);

    return user;
  }
}
