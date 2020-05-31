import { UserChat } from "../../entity/UserChat";
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
import { Not } from "typeorm";

@Resolver()
export class CreateChatResolver {
  @Mutation(() => Chat)
  async createChat(@Arg("userId") userId: string, @Ctx() ctx: Context) {
    const { userId: meId } = ctx.req;

    const userIds = [meId, userId];

    // console.log(chat);

    // console.log(users);

    const { id: chatId } = await Chat.create().save();

    userIds.forEach(async (userId) => {
      await UserChat.create({
        userId,
        chatId,
      }).save();
    });

    const userToChats = await UserChat.find({
      where: { userId: "7adaada3-00b4-4708-a5d6-c983f769fd70" },
    });

    const chatIdsObjects = userToChats.map((userToChat) => ({
      chatId: userToChat.chatId,
      userId: Not(userId),
    }));

    const userToChats2 = await UserChat.find({
      where: chatIdsObjects,
      relations: ["user"],
    });

    console.log("d");

    console.log(userToChats2, "lol");

    // console.log(savedChat);

    // console.log(await Chat.find());

    // users.forEach(async (user) => {
    //   // console.log(user);
    //   user.chats ? user.chats.push(chat) : (user.chats = [savedChat]);

    //   await user.save();
    // });

    // const allUsers = await Chat.find({
    //   join: {
    //     alias: "chat",
    //     leftJoinAndSelect: {
    //       users: "chat.users",
    //     },
    //   },
    // });

    // console.dir(allUsers, { depth: null });

    // console.dir(allChats, { depth: 99 });

    // await pubSub.publish(Topic.ChatCreated, chat);

    console.log("jDKASJDAKSJDKAJSDKJASKDJKSADKASKDAS");
  }
}
