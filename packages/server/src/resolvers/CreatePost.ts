import { Resolver, Mutation, Arg } from "type-graphql";
import { Post } from "../entity/Post";

@Resolver()
export class CreatePostResolver {
  @Mutation(() => Post)
  createPost(@Arg("content") content: string) {
    return Post.create({ content }).save();
  }
}
