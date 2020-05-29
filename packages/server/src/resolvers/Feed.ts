import { PostConnection } from "../entity/PostConnection";
import { Post } from "../entity/Post";
import { Query, Resolver, Arg } from "type-graphql";

@Resolver()
export class FeedResolver {
  @Query(() => PostConnection)
  async feed(@Arg("cursor") cursor: number): Promise<PostConnection> {
    const LIMIT = 5;

    const posts = await Post.find({ take: LIMIT + 1, skip: cursor });

    const hasNextPage = posts.length > LIMIT;
    const edges = hasNextPage ? posts.slice(0, -1) : posts;
    const endCursor = edges[edges.length - 1].id;

    return {
      edges,
      pageInfo: {
        hasNextPage,
        endCursor,
      },
    };
  }
}
