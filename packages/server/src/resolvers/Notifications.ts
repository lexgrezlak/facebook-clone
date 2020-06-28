import { Context } from "./../context";
import { Query, Resolver, Ctx } from "type-graphql";
import { Notification } from "./../entity/Notification";
import { Post } from "../entity/Post";
import { In } from "typeorm";

@Resolver()
export class NotificationsResolver {
  @Query(() => [Notification])
  async notifications(@Ctx() ctx: Context) {
    const { userId } = ctx.req;

    const posts = await Post.find({ where: { userId }, select: ["id"] });
    const postIds = posts.map((post) => post.id);

    return Notification.find({
      where: { postId: In(postIds) },
      relations: ["user"],
    });
  }
}
