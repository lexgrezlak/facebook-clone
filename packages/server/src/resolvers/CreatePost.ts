@Resolver()
export class CreatePostResolver {
  @Mutation(() => Post)
  createPost(@Arg("content") content: string) {
    return Post.create({ content }).save();
  }
}
