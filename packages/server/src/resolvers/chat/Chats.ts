import { Chat } from "./../../entity/Chat";
import { Context } from "./../../context";
import { Query, Resolver, Ctx, Arg } from "type-graphql";
import { User } from "../../entity/User";
import { Any } from "typeorm";

@Resolver()
export class ChatsResolver {
  @Query(() => [Chat])
  async chats(@Arg("userId") userId: string) {
    // const { userId } = ctx.req;
    const user = await User.findOneOrFail({
      where: { id: userId },
      relations: ["chats"],
    });
    console.log(user.chats);

    return user.chats;
  }
}
