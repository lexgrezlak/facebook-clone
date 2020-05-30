import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
} from "typeorm";
import { Field, ID, ObjectType } from "type-graphql";
import { User } from "./User";

export enum Status {
  PENDING = "pending",
  FRIENDS = "friends",
}

@ObjectType()
@Entity()
export class FriendStatus extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column("timestamp", { default: null })
  responseTime: Date;

  @Field()
  @Column("timestamp", { default: () => "CURRENT_TIMESTAMP(6)" })
  sentTime: Date;

  @Field()
  @Column()
  fromUserId: string;

  @Field()
  @Column()
  toUserId: string;

  @Field()
  @Column("enum", { enum: Status, default: Status.PENDING })
  status: Status;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.sentRequests)
  fromUser: User;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.receivedRequests)
  toUser: User;
}
