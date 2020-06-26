import { Resolver, Mutation, Arg } from "type-graphql";
import { Post } from "../../entity/Post";

@Resolver()
export class DeletePostResolver {
  @Mutation(() => Boolean)
  async deletePost(@Arg("id") id: string) {
    const result = await Post.delete({ id });

    return !!result.affected;
  }
}
