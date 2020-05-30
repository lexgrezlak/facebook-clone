import { Context } from "./../context";
import { Mutation, Arg, Ctx, Resolver } from "type-graphql";
import { FriendStatus } from "../entity/FriendStatus";

@Resolver()
export class SendRequestResolver {
  @Mutation(() => Boolean)
  async sendRequest(@Arg("userId") userId: string, @Ctx() ctx: Context) {
    const { userId: fromUserId } = ctx.req;

    await FriendStatus.create({
      fromUserId,
      toUserId: userId,
    }).save();

    return true;
  }
}
