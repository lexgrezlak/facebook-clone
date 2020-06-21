import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  OneToMany,
  JoinTable,
} from "typeorm";
import { Field, ID, ObjectType, Root } from "type-graphql";
import { User } from "./User";
import { Message } from "./Message";

@ObjectType()
@Entity()
export class Chat extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field(() => [User])
  @ManyToMany(() => User, (user) => user.chats)
  @JoinTable({
    name: "userChat",
    joinColumn: {
      name: "chatId",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "userId",
      referencedColumnName: "id",
    },
  })
  users: User[];

  @Field(() => [Message])
  @OneToMany(() => Message, (message) => message.chat)
  @JoinTable()
  messages: Message[];

  @Field(() => Message)
  lastMessage(@Root() parent: Chat): Message {
    const lastMessage = parent.messages[parent.messages.length - 1];
    return lastMessage;
  }
}
