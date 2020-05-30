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

@ObjectType()
@Entity()
export class Post extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  userId: string;

  @Field()
  @Column("text")
  content: string;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn()
  user: User;

  @Field()
  @Column("timestamp", { default: () => "CURRENT_TIMESTAMP(6)" })
  createdAt: Date;
}
