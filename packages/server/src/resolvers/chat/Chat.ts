import { Chat } from "./../../entity/Chat";
import { Context } from "./../../context";
import { Query, Resolver, Ctx, Arg } from "type-graphql";
import { User } from "../../entity/User";

@Resolver()
export class ChatResolver {
  @Query(() => Chat)
  async chat(@Arg("id") id: string, @Ctx() ctx: Context) {
    const { userId } = ctx.req;
    const chat = await Chat.findOneOrFail({
      where: { id },
      relations: ["users", "messages", "messages.user"],
    });

    // get rid of me (user) from the users array
    // to not have to filter out me on the client side
    chat.users = chat.users.filter((user) => user.id !== userId);

    return chat;
  }
}
