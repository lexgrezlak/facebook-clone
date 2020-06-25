import { Comment } from "./../../entity/Comment";
import { Context } from "../../context";
import { Resolver, Mutation, Arg, Ctx } from "type-graphql";
import { CreateCommentInput } from "./CreateCommentInput";

@Resolver()
export class CreateCommentResolver {
  @Mutation(() => Boolean)
  async createComment(
    @Arg("postId") postId: string,
    @Arg("input") { content }: CreateCommentInput,
    @Ctx() ctx: Context
  ) {
    const { userId } = ctx.req;

    await Comment.create({
      userId,
      postId,
      content,
    }).save();

    return true;
  }
}
