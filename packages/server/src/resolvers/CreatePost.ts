import { Context } from "./../context";
import { Resolver, Mutation, Arg, Ctx } from "type-graphql";
import { Post } from "../entity/Post";

@Resolver()
export class CreatePostResolver {
  @Mutation(() => Post)
  createPost(@Arg("content") content: string, @Ctx() ctx: Context) {
    const { userId } = ctx.req;
    console.log(typeof userId);

    return Post.create({ content, userId: Number(userId) }).save();
  }
}
