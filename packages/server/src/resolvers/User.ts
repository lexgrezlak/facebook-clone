import { Query, Resolver, Arg } from "type-graphql";
import { User } from "../entity/User";

@Resolver()
export class UserResolver {
  @Query(() => User)
  user(@Arg("id") id: string): Promise<User> {
    return User.findOneOrFail({ where: { id }, relations: ["posts"] });
  }
}
