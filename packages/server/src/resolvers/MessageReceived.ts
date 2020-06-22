import { Chat } from "./../entity/Chat";
import { Context } from "./../context";
import { Resolver, Subscription, Root, Ctx } from "type-graphql";
import { Topic } from "../enums";
import { Message } from "../entity/Message";

interface Payload {
  messageReceived: Message;
}

@Resolver()
export class MessageReceivedResolver {
  @Subscription(() => Message, {
    topics: Topic.MessageReceived,
  })
  async messageReceived(
    @Root() { messageReceived }: Payload,
    @Ctx() ctx: Context
  ) {
    const { userId } = ctx.connection.context;

    const chat = await Chat.findOneOrFail({
      where: { id: messageReceived.chatId },
      relations: ["users"],
    });

    const usersIds = chat.users.map((user) => user.id);

    console.log(usersIds, userId);

    if (usersIds.includes(userId)) {
      console.log("true");
      return messageReceived;
    }

    return "doesnt include user id";
  }
}
