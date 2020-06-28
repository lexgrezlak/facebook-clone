import { PostLike } from "./../../entity/PostLike";
import { Context } from "../../context";
import { Resolver, Mutation, Arg, Ctx } from "type-graphql";
import { NotificationType } from "../../enums";
import { Notification } from "../../entity/Notification";

@Resolver()
export class UnlikePostResolver {
  @Mutation(() => Boolean)
  async unlikePost(@Arg("postId") postId: string, @Ctx() ctx: Context) {
    const { userId } = ctx.req;

    await PostLike.delete({ postId, userId });
    Notification.delete({ postId, userId, type: NotificationType.PostLiked });

    return true;
  }
}
