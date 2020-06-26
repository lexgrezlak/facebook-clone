import { Context } from "../../context";
import { Mutation, Arg, Ctx, Resolver } from "type-graphql";
import { FriendStatus, Status } from "../../entity/FriendStatus";

@Resolver()
export class UnfriendResolver {
  @Mutation(() => Boolean)
  async unfriend(@Arg("userId") userId: string, @Ctx() ctx: Context) {
    const { userId: meId } = ctx.req;

    const friendStatus = await FriendStatus.findOneOrFail({
      where: [
        { fromUserId: userId, toUserId: meId, status: Status.Friends },
        { fromUserId: meId, toUserId: userId, status: Status.Friends },
      ],
    });

    await friendStatus.remove();

    return true;
  }
}
