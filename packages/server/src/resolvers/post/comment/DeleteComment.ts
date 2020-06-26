import { Resolver, Mutation, Arg, Ctx } from "type-graphql";
import { CreateCommentInput } from "./CreateCommentInput";
import { Context } from "../../../context";
import { Comment } from "../../../entity/Comment";

@Resolver()
export class DeleteCommentResolver {
  @Mutation(() => Boolean)
  async deleteComment(@Arg("id") id: string, @Ctx() ctx: Context) {
    await Comment.delete(id);

    return true;
  }
}
