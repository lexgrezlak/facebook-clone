import { PostConnection } from "../../entity/PostConnection";
import { Post } from "../../entity/Post";
import { Query, Resolver, Arg } from "type-graphql";

@Resolver()
export class LikesOfPostResolver {
  @Query(() => Number)
  async likesOfPost(@Arg("postId") postId: string) {
    const post = await Post.findOneOrFail({
      where: { id: postId },
      relations: ["postLikes"],
    });

    return post.postLikes.length;
  }
}
