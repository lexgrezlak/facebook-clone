import { Context } from "./../context";
import { hash } from "bcryptjs";
import { Mutation, Arg, Resolver, Ctx } from "type-graphql";
import { User } from "../entity/User";
import { SignUpInput } from "./SignUpInput";
import { generateToken, setCookie } from "../utils/cookies";

@Resolver()
export class SignUpResolver {
  @Mutation(() => User)
  async signUp(
    @Arg("data")
    { email, firstName, lastName, password, birthday }: SignUpInput,
    @Ctx() ctx: Context
  ): Promise<User> {
    const passwordHash = await hash(password, 12);

    const user = await User.create({
      firstName,
      lastName,
      passwordHash,
      birthday,
      email,
    }).save();

    const token = generateToken({ userId: user.id });
    setCookie(ctx.res, token);

    return user;
  }
}
