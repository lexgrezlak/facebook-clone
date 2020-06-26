import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
} from "typeorm";
import { Field, ID } from "type-graphql";
import { User } from "./User";
import { Chat } from "./Chat";

@Entity()
export class UserChat extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  userId: string;

  @Column()
  chatId: string;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.userChats)
  user: User;

  @Field(() => Chat)
  @ManyToOne(() => Chat, (chat) => chat.userChats)
  chat: Chat;
}
