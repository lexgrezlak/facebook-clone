import { FriendStatus, Status } from "./../entity/FriendStatus";
import { Context } from "./../context";
import { Resolver, Ctx, Query } from "type-graphql";

@Resolver()
export class FriendRequestsResolver {
  @Query(() => [FriendStatus])
  friendRequests(@Ctx() ctx: Context) {
    const { userId } = ctx.req;

    return FriendStatus.find({
      where: {
        toUserId: userId,
        status: Status.PENDING,
      },
      relations: ["fromUser"],
    });
  }
}
