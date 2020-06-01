import {
  Resolver,
  Mutation,
  Arg,
  Ctx,
  PubSub,
  PubSubEngine,
} from "type-graphql";

import { CreateMessageInput } from "./CreateMessageInput";
import { Message } from "../entity/Message";
import { Topic } from "../enums";
import { Context } from "../context";

@Resolver()
export class CreateMessageResolver {
  @Mutation(() => Message)
  async createMessage(
    @Arg("input") { content, chatId }: CreateMessageInput,
    @Ctx() ctx: Context,
    @PubSub() pubSub: PubSubEngine
  ) {
    const { userId } = ctx.req;

    const message = await Message.create({
      content,
      chatId,
      userId,
    }).save();

    await pubSub.publish(Topic.MessageCreated, content);

    return message;
  }
}
