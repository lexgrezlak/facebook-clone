import {
  Resolver,
  Mutation,
  Arg,
  Ctx,
  PubSub,
  PubSubEngine,
} from "type-graphql";
import { Topic } from "../../enums";
import { Context } from "../../context";
import { CreateMessageInput } from "./CreateMessageInput";
import { Message } from "../../entity/Message";

@Resolver()
export class CreateMessageResolver {
  @Mutation(() => Message)
  async createMessage(
    @Arg("input") { content }: CreateMessageInput,
    @Arg("chatId") chatId: string,
    @Ctx() ctx: Context,
    @PubSub() pubSub: PubSubEngine
  ) {
    const { userId } = ctx.req;

    const message = await Message.create({
      content,
      chatId,
      userId,
    }).save();

    pubSub.publish(Topic.MessageReceived, { messageReceived: message });

    return message;
  }
}
