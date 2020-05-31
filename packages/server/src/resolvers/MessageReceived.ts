import { Resolver, Subscription, Root } from "type-graphql";
import { Topic } from "../enums";
import { Message } from "../entity/Message";

@Resolver()
export class MessageReceivedResolver {
  @Subscription(() => String, {
    topics: Topic.MessageReceived,
  })
  messageReceived(@Root() message: Message) {
    console.log(message);

    return message;
  }
}
