import { Chat } from "./../../entity/Chat";
import { Context } from "../../context";
import {
  Resolver,
  Mutation,
  Arg,
  Ctx,
  PubSub,
  PubSubEngine,
} from "type-graphql";
import { User } from "../../entity/User";
import { Topic } from "../../enums";

@Resolver()
export class CreateChatResolver {
  @Mutation(() => Chat)
  async createChat(
    @Arg("userId") userId: string,
    @Ctx() ctx: Context,
    @PubSub() pubSub: PubSubEngine
  ) {
    const { userId: meId } = ctx.req;

    const chat = await Chat.create().save();

    const users = await User.find({
      where: [{ id: meId }, { id: userId }],
      relations: ["chats"],
    });

    users.forEach((user) => {
      console.log(user.chats);

      user.chats ? user.chats.push(chat) : (user.chats = [chat]);

      user.save();
    });

    await pubSub.publish(Topic.ChatCreated, chat);

    return chat;
  }
}
