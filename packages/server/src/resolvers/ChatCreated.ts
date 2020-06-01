import { Resolver, Subscription, Root } from "type-graphql";
import { Topic } from "../enums";
import { Message } from "../entity/Message";

@Resolver()
export class ChatCreatedResolver {
  @Subscription(() => String, {
    topics: Topic.ChatCreated,
  })
  chatCreated(@Root() message: Message) {
    console.log(message);

    return message;
  }
}
