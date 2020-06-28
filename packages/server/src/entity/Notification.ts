import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Field, ID, ObjectType } from "type-graphql";
import { User } from "./User";
import { Post } from "./Post";
import { NotificationType } from "../enums";

@ObjectType()
@Entity()
export class Notification extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column()
  userId: string;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.notifications)
  @JoinColumn()
  user: User;

  @Field()
  @Column()
  postId: string;

  @Field(() => Post)
  @ManyToOne(() => Post)
  @JoinColumn()
  post: Post;

  @Field(() => String)
  @Column("enum", { enum: NotificationType })
  type: NotificationType;

  @Field()
  @Column("timestamp", { default: () => "CURRENT_TIMESTAMP(6)" })
  receivedAt: Date;

  @Field({ nullable: true })
  @Column("timestamp", { default: null })
  readTime: Date;
}
