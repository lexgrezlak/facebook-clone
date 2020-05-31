import { Query, Resolver, Arg, Ctx } from "type-graphql";
import { FriendStatus } from "../../entity/FriendStatus";
import { Context } from "../../context";

@Resolver()
export class FriendStatusResolver {
  @Query(() => FriendStatus, { nullable: true })
  friendStatus(
    @Arg("userId") userId: string,
    @Ctx() ctx: Context
  ): Promise<FriendStatus | undefined> {
    const { userId: myUserId } = ctx.req;

    return FriendStatus.findOne({
      where: [
        { fromUserId: userId, toUserId: myUserId },
        { fromUserId: myUserId, toUserId: userId },
      ],
    });
  }
}
