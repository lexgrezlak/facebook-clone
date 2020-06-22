import { Post } from "./Post";
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Field, ID, ObjectType } from "type-graphql";
import { User } from "./User";

@ObjectType()
@Entity()
export class PostLike extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  userId: string;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.postLikes)
  @JoinColumn()
  user: User;

  @Column()
  postId: string;

  @Field(() => Post)
  @ManyToOne(() => Post, (post) => post.postLikes)
  @JoinColumn()
  post: Post;
}
