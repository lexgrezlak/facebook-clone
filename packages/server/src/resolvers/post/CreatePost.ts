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
export class CreatePostResolver {
  @Mutation(() => Post)
  async createPost(
    @Arg("input") { content }: CreatePostInput,
    @Ctx() ctx: Context,
    @PubSub() pubSub: PubSubEngine
  ) {
    const { userId } = ctx.req;

    const { id } = await Post.create({
      content,
      userId,
    }).save();

    await pubSub.publish("POST_CREATED", content);

    return Post.findOne({ where: { id }, relations: ["user"] });
  }
}
