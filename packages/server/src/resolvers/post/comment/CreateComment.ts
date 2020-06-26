import { Resolver, Mutation, Arg, Ctx } from "type-graphql";
import { CreateCommentInput } from "./CreateCommentInput";
import { Context } from "../../../context";
import { Comment } from "../../../entity/Comment";

@Resolver()
export class CreateCommentResolver {
  @Mutation(() => Comment)
  async createComment(
    @Arg("postId") postId: string,
    @Arg("input") { content }: CreateCommentInput,
    @Ctx() ctx: Context
  ) {
    const { userId } = ctx.req;

    const comment = await Comment.create({
      userId,
      postId,
      content,
    }).save();

    return comment;
  }
}
