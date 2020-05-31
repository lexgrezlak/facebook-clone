import { CreatePostInput } from "./CreatePostInput";
import { Context } from "../../context";
import { Resolver, Mutation, Arg, Ctx } from "type-graphql";
import { Post } from "../../entity/Post";

@Resolver()
export class CreatePostResolver {
  @Mutation(() => Post)
  async createPost(
    @Arg("input") { content }: CreatePostInput,
    @Ctx() ctx: Context
  ) {
    const { userId } = ctx.req;

    const { id } = await Post.create({
      content,
      userId,
    }).save();

    return Post.findOne({ where: { id }, relations: ["user"] });
  }
}
