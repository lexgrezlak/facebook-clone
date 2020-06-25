import { Chat } from "./../../entity/Chat";
import { Context } from "./../../context";
import { Query, Resolver, Ctx, Arg } from "type-graphql";
import { User } from "../../entity/User";

@Resolver()
export class ChatsResolver {
  @Query(() => [Chat])
  async chats(@Ctx() ctx: Context) {
    const { userId } = ctx.req;
    const { chats } = await User.findOneOrFail({
      where: { id: userId },
      relations: ["chats", "chats.users", "chats.messages"],
    });

    const nonEmptyChats = chats.filter((chat) => chat.messages.length > 0);

    const previewChats = nonEmptyChats.map((chat) => {
      // get rid of me (user) from the users array
      // to not have to filter out me on the client side
      chat.users = chat.users.filter((user) => user.id !== userId);

      return chat;
    });

    // sort by sent time of the last message (latest message' chat first in the array)
    previewChats.sort((chatA, chatB) => {
      const lastMessageOfChatA = chatA.messages[chatA.messages.length - 1];
      const lastMessageOfChatB = chatB.messages[chatB.messages.length - 1];

      return (
        // .getTime() because otherwise typescript throws an error (it would work in js without it)
        lastMessageOfChatB.sentTime.getTime() -
        lastMessageOfChatA.sentTime.getTime()
      );
    });

    return previewChats;
  }
}
