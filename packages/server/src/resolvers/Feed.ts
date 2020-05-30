import { PostConnection } from "../entity/PostConnection";
import { Post } from "../entity/Post";
import { Query, Resolver, Arg } from "type-graphql";

@Resolver()
export class FeedResolver {
  @Query(() => PostConnection)
  async feed(
    @Arg("cursor", { defaultValue: 0 }) cursor: number
  ): Promise<PostConnection> {
    const LIMIT = 10;

    const posts = await Post.find({
      order: { createdAt: "DESC" },
      skip: cursor || undefined,
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
