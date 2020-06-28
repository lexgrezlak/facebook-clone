import { PostLike } from "./../../entity/PostLike";
import { Context } from "../../context";
import { Resolver, Mutation, Arg, Ctx } from "type-graphql";
import { NotificationType } from "../../enums";
import { Notification } from "./../../entity/Notification";

@Resolver()
export class LikePostResolver {
  @Mutation(() => Boolean)
  async likePost(@Arg("postId") postId: string, @Ctx() ctx: Context) {
    const { userId } = ctx.req;

    await PostLike.create({ postId, userId }).save();

    Notification.create({
      userId,
      postId,
      type: NotificationType.PostLiked,
    }).save();

    return true;
  }
}
