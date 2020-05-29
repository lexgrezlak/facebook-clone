import { hash } from "bcryptjs";
import { Mutation, Arg, Resolver } from "type-graphql";
import { User } from "../entity/User";
import { SignUpInput } from "./SignUpInput";

@Resolver()
export class SignUpResolver {
  @Mutation(() => User)
  async signUp(
    @Arg("data")
    { email, firstName, lastName, password, birthday }: SignUpInput
  ): Promise<User> {
    const passwordHash = await hash(password, 12);

    const user = await User.create({
      firstName,
      lastName,
      passwordHash,
      birthday,
      email,
    }).save();

    return user;
  }
}
