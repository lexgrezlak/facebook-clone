import { Context } from "../../context";
import { Mutation, Arg, Ctx, Resolver } from "type-graphql";
import { FriendStatus, Status } from "../../entity/FriendStatus";

@Resolver()
export class CancelRequestResolver {
  @Mutation(() => Boolean)
  async cancelRequest(@Arg("userId") userId: string, @Ctx() ctx: Context) {
    const { userId: fromUserId } = ctx.req;

    await FriendStatus.delete({
      fromUserId,
      toUserId: userId,
      status: Status.Pending,
    });

    return true;
  }
}
