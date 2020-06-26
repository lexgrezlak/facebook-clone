import { Query, Resolver, Arg } from "type-graphql";
import { Comment } from "../../../entity/Comment";

@Resolver()
export class CommentsResolver {
  @Query(() => [Comment])
  async comments(@Arg("postId") postId: string) {
    const comments = await Comment.find({
      where: { postId },
      relations: ["user"],
      order: { createdAt: "ASC" },
    });

    return comments;
  }
}
