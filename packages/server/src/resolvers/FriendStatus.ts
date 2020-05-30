import { Query, Resolver, Arg, Ctx } from "type-graphql";
import { FriendStatus } from "../entity/FriendStatus";
import { Context } from "../context";

@Resolver()
export class FriendStatusResolver {
  @Query(() => FriendStatus)
  friendStatus(
    @Arg("userId") userId: string,
    @Ctx() ctx: Context
  ): Promise<FriendStatus> {
    const { userId: myUserId } = ctx.req;

    return FriendStatus.findOneOrFail({
      where: [
        { fromUserId: userId, toUserId: myUserId },
        { fromUserId: myUserId, toUserId: userId },
      ],
    });
  }
}
