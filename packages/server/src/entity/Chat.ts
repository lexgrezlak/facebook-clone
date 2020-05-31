import { UserChat } from "./UserChat";
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  OneToMany,
  PrimaryColumn,
  JoinTable,
} from "typeorm";
import { Field, ID, ObjectType } from "type-graphql";
import { User } from "./User";
import { Message } from "./Message";

@ObjectType()
@Entity()
export class Chat extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @OneToMany(() => UserChat, (userChat) => userChat.chat)
  userChat: UserChat[];
  // @Field(() => [User])
  // @ManyToMany(() => User, (user) => user.chats)
  // @JoinTable()
  // users: User[];

  @Field(() => [Message])
  @OneToMany(() => Message, (message) => message.chat)
  @JoinTable()
  messages: Message[];
}
