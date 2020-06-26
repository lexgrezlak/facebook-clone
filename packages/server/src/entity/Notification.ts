import { PostLike } from "./PostLike";
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from "typeorm";
import { Field, ID, ObjectType, Root } from "type-graphql";
import { User } from "./User";

@ObjectType()
@Entity()
export class Notification extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  userId: string;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.notifications)
  @JoinColumn()
  user: User;

  @Field()
  @Column("text")
  message: string;

  @Field()
  @Column("text")
  link: string;

  @Field()
  @Column("timestamp", { default: () => "CURRENT_TIMESTAMP(6)" })
  receivedAt: Date;
}
