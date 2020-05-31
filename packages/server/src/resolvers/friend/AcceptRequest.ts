import { Context } from "../../context";
import { Mutation, Arg, Ctx, Resolver } from "type-graphql";
import { FriendStatus, Status } from "../../entity/FriendStatus";

@Resolver()
export class AcceptRequestResolver {
  @Mutation(() => Boolean)
  async acceptRequest(@Arg("userId") userId: string, @Ctx() ctx: Context) {
    const { userId: toUserId } = ctx.req;

    await FriendStatus.update(
      { fromUserId: userId, toUserId, status: Status.PENDING },
      { status: Status.FRIENDS }
    );

    return true;
  }
}
