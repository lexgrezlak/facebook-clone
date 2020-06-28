import { Resolver, Mutation, Arg, Ctx } from "type-graphql";
import { CreateCommentInput } from "./CreateCommentInput";
import { Context } from "../../../context";
import { Comment } from "../../../entity/Comment";
import { Notification } from "../../../entity/Notification";
import { NotificationType } from "../../../enums";

@Resolver()
export class DeleteCommentResolver {
  @Mutation(() => Boolean)
  async deleteComment(@Arg("id") id: string, @Ctx() ctx: Context) {
    const comment = await Comment.findOne(id);

    await Comment.delete(comment);

    Notification.delete({
      userId: comment.userId,
      postId: comment.postId,
      type: NotificationType.PostCommented,
    });

    return true;
  }
}
