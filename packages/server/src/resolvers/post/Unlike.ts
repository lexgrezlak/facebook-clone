import { PostLike } from "./../../entity/PostLike";
import { CreatePostInput } from "./CreatePostInput";
import { Context } from "../../context";
import {
  Resolver,
  Mutation,
  Arg,
  Ctx,
  PubSub,
  PubSubEngine,
} from "type-graphql";
import { Post } from "../../entity/Post";

@Resolver()
export class UnlikePostResolver {
  @Mutation(() => Boolean)
  async unlikePost(@Arg("postId") postId: string, @Ctx() ctx: Context) {
    const { userId } = ctx.req;

    await PostLike.delete({ postId, userId });

    return true;
  }
}
