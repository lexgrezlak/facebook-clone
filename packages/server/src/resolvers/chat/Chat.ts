import { Chat } from "./../../entity/Chat";
import { Context } from "./../../context";
import { Query, Resolver, Ctx, Arg } from "type-graphql";
import { Message } from "../../entity/Message";

@Resolver()
export class ChatResolver {
  @Query(() => Chat)
  async chat(@Arg("id") id: string, @Ctx() ctx: Context) {
    const { userId } = ctx.req;
    const chat = await Chat.findOneOrFail({
      where: { id },
      relations: ["users", "messages", "messages.user"],
    });

    // mark as read all messages received by the authenticated user
    chat.messages = chat.messages.map((message) => {
      const isMeReceiver = message.userId !== userId;
      const isUnread = !message.readTime;

      if (isUnread && isMeReceiver) {
        message.readTime = new Date();
        message.save();
      }

      return message;
    });

    // sort messages so that the latest are last (on the bottom)
    chat.messages.sort((a, b) => a.sentTime.getTime() - b.sentTime.getTime());

    // get rid of me (user) from the users array
    // to not have to filter out me on the client side
    chat.users = chat.users.filter((user) => user.id !== userId);

    return chat;
  }
}
