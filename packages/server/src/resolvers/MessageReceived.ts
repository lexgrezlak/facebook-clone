import { Chat } from "./../entity/Chat";
import { Context } from "./../context";
import { Resolver, Subscription, Root, Ctx } from "type-graphql";
import { Topic } from "../enums";
import { Message } from "../entity/Message";
import { ForbiddenError } from "apollo-server-express";

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

    const isChatMember = usersIds.includes(userId);

    // gonna need the user for the last message cache update
    messageReceived.user = chat.users.find(
      (user) => user.id === messageReceived.userId
    );

    return isChatMember
      ? messageReceived
      : new ForbiddenError("Not authorized");
  }
}
