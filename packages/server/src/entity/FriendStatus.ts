import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
} from "typeorm";
import { Field, ID, ObjectType, Ctx, Root } from "type-graphql";
import { User } from "./User";
import { Context } from "../context";

// Status is here instead of in enums beacause otherwise
// it throws an error
// `cannot determine graphql output
// type for status of FriendStatus class`

export enum Status {
  Pending = "PENDING",
  Friends = "FRIENDS",
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
  @Column("enum", { enum: Status, default: Status.Pending })
  status: Status;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.sentRequests)
  fromUser: User;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.receivedRequests)
  toUser: User;
}
