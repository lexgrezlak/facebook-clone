import { Context } from "../../context";
import { Mutation, Arg, Ctx, Resolver } from "type-graphql";
import { FriendStatus, Status } from "../../entity/FriendStatus";

@Resolver()
export class RejectRequestResolver {
  @Mutation(() => Boolean)
  async rejectRequest(@Arg("userId") userId: string, @Ctx() ctx: Context) {
    const { userId: toUserId } = ctx.req;

    await FriendStatus.delete({
      fromUserId: userId,
      toUserId,
      status: Status.Pending,
    });

    return true;
  }
}
