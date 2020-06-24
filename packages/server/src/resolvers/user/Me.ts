import { Resolver, Query, Ctx } from "type-graphql";
import { User } from "../../entity/User";
import { Context } from "../../context";

@Resolver()
export class MeResolver {
  @Query(() => User, { nullable: true, complexity: 5 })
  async me(@Ctx() ctx: Context): Promise<User | undefined> {
    const { userId } = ctx.req;

    if (!userId) return undefined;

    return User.findOne(userId);
  }
}
