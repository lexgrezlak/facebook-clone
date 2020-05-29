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
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column("date", { default: null })
  responseTime: Date;

  @Field()
  @Column("date", { default: new Date() })
  sentTime: Date;

  @Field()
  @Column("enum", { enum: Status, default: Status.PENDING })
  status: Status;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.friendStatuses)
  fromUser: User;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.friendStatuses)
  toUser: User;
}
