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
export class CreatePostLikeResolver {
  @Mutation(() => Boolean)
  async createPostLike(
    @Arg("postId") postId: string,
    @Ctx() ctx: Context,
    @PubSub() pubSub: PubSubEngine
  ) {
    const { userId } = ctx.req;

    const { id } = await PostLike.create({
      userId,
      postId,
    }).save();

    await pubSub.publish("POST_LIKED", id);

    return true;
  }
}
