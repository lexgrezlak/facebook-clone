import { Query, Resolver, Arg, Ctx } from "type-graphql";
import { FriendStatus } from "../../entity/FriendStatus";
import { Context } from "../../context";
import { Post } from "../../entity/Post";
import { PostLike } from "../../entity/PostLike";

@Resolver()
export class IsPostLikedResolver {
  @Query(() => Boolean)
  async isPostLiked(@Arg("postId") postId: string, @Ctx() ctx: Context) {
    const { userId } = ctx.req;

    const postLike = await PostLike.findOne({
      where: { postId, userId },
    });

    return !!postLike;
  }
}
