import { PostConnection } from "../../entity/PostConnection";
import { Post } from "../../entity/Post";
import { Query, Resolver, Arg } from "type-graphql";

@Resolver()
export class PostsResolver {
  @Query(() => PostConnection)
  async posts(
    @Arg("cursor", { defaultValue: 0 }) cursor: number,
    @Arg("userId", { nullable: true }) userId: string
  ): Promise<PostConnection> {
    const LIMIT = 10;

    const posts = await Post.find({
      ...(userId && { where: { userId } }),
      order: { createdAt: "DESC" },
      // skip: cursor || undefined,
      ...(cursor && { skip: cursor }),
      take: LIMIT + 1,
      relations: ["user"],
    });

    const hasNextPage = posts.length > LIMIT;
    const edges = hasNextPage ? posts.slice(0, -1) : posts;
    const endCursor = cursor + LIMIT;

    return {
      edges,
      pageInfo: {
        hasNextPage,
        endCursor,
      },
    };
  }
}
