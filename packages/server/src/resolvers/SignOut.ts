import { Mutation, Ctx, Resolver } from "type-graphql";

import { clearCookie } from "../utils/cookies";
import { Context } from "../context";

@Resolver()
export class SignOutResolver {
  @Mutation(() => Boolean)
  signOut(@Ctx() ctx: Context): true {
    clearCookie(ctx.res);
    return true;
  }
}
