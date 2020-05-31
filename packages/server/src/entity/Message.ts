import { Chat } from "./Chat";
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from "typeorm";
import { Field, ID, ObjectType } from "type-graphql";
import { User } from "./User";

@ObjectType()
@Entity()
export class Message extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column()
  content: string;

  @Field()
  @Column("timestamp", { default: null })
  readTime: Date;

  @Field()
  @Column("timestamp", { default: () => "CURRENT_TIMESTAMP(6)" })
  sentTime: Date;

  @Field()
  @Column()
  chatId: string;

  @Field(() => Chat)
  @ManyToOne(() => Chat, (chat) => chat.messages)
  chat: Chat;

  @Field()
  @Column()
  userId: string;

  @Field(() => User)
  @OneToOne(() => User)
  @JoinColumn()
  user: User;
}
