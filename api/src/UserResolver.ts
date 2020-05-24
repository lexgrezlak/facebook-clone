import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { hash } from "bcryptjs";
import { User } from "./entity/User";
import { Gender } from "../../common/types";
import { Context } from "./context";

@Resolver()
export class UserResolver {
  @Query(() => User, { nullable: true })
  me(@Ctx() context: Context) {
    const { userId } = context.req;
    if (!userId) return null;

    try {
      return User.findOne(userId);
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  @Mutation(() => SignResponse)
  async signUp(
    @Arg("email")
    email: string,
    @Arg("password")
    password: string,
    @Arg("firstName")
    firstName: string,
    @Arg("lastName")
    lastName: string,
    @Arg("gender")
    gender: string,
    @Arg("birthday")
    birthday: Date
  ) {
    const passwordHash = await hash(password, 12);

    try {
      await User.insert({
        firstName,
        lastName,
        gender,
        birthday,
        email,
        passwordHash,
      });
    } catch (error) {
      console.log(error);
      return false;
    }

    return true;
  }

  @Mutation(() => SignResponse)
  async signIn(
    @Arg("email")
    email: string,
    @Arg("password")
    password: string
  ): Promise<SignResponse> {
    const user = await User.findOne();
  }
}
