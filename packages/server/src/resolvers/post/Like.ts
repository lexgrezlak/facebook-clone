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
export class LikePostResolver {
  @Mutation(() => Boolean)
  async likePost(
    @Arg("postId") postId: string,
    @Ctx() ctx: Context,
    @PubSub() pubSub: PubSubEngine
  ) {
    const { userId } = ctx.req;

    await PostLike.create({ postId, userId }).save();

    return true;
  }
}
