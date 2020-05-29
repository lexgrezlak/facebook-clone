import { Post } from "../entity/Post";
import { Query, Resolver } from "type-graphql";

@Resolver()
export class FeedResolver {
  @Query(() => [Post])
  feed() {
    return Post.find();
  }
}
