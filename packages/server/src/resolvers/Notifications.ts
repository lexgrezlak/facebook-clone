import { Context } from "./../context";
import { Query, Resolver, Ctx } from "type-graphql";
import { Notification } from "./../entity/Notification";

@Resolver()
export class NotificationsResolver {
  @Query(() => [Notification])
  async notifications(@Ctx() ctx: Context) {
    const { userId } = ctx.req;
    return Notification.find({ where: { userId } });
  }
}
