import { UserChat } from "./UserChat";
import { Post } from "./Post";
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Field, ID, ObjectType, Root } from "type-graphql";
import { FriendStatus } from "./FriendStatus";
import { Chat } from "./Chat";
import { PostLike } from "./PostLike";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column("text")
  firstName: string;

  @Field()
  @Column("text")
  lastName: string;

  @Field({ complexity: 3 })
  fullName(@Root() parent: User): string {
    return `${parent.firstName} ${parent.lastName}`;
  }

  @Field()
  @Column("text", { unique: true })
  email: string;

  @Column()
  passwordHash: string;

  @Field()
  @Column("date")
  birthday: Date;

  @Field({ nullable: true })
  @Column("text", { nullable: true })
  avatar: string;

  @Field()
  @Column("text", {
    default:
      "https://images.pexels.com/photos/235985/pexels-photo-235985.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
  })
  background: string;

  @Field(() => [Post])
  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @Field(() => [Chat])
  @ManyToMany(() => Chat, (chat) => chat.users)
  chats: Chat[];

  @OneToMany(() => PostLike, (postLike) => postLike.user)
  postLikes: PostLike[];

  // @Field(() => [Post])
  // @ManyToMany(() => Post, (post) => post.usersWhoLike)
  // likedPosts: Post[];

  @OneToMany(() => FriendStatus, (friendStatus) => friendStatus.fromUser)
  sentRequests: FriendStatus[];

  @OneToMany(() => FriendStatus, (friendStatus) => friendStatus.fromUser)
  receivedRequests: FriendStatus[];
}
