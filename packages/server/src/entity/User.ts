import { Post } from "./Post";
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  In,
  Not,
} from "typeorm";
import { Field, ID, ObjectType, Root, Ctx } from "type-graphql";
import { FriendStatus, Status } from "./FriendStatus";
import { Chat } from "./Chat";
import { PostLike } from "./PostLike";
import { Notification } from "./Notification";
import { Context } from "../context";

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

  @Field(() => [Notification])
  @OneToMany(() => Notification, (notification) => notification.user)
  notifications: Notification[];

  @Field(() => [Chat])
  @ManyToMany(() => Chat, (chat) => chat.users)
  chats: Chat[];

  @OneToMany(() => PostLike, (postLike) => postLike.user)
  postLikes: PostLike[];

  @OneToMany(() => FriendStatus, (friendStatus) => friendStatus.fromUser)
  sentRequests: FriendStatus[];

  @OneToMany(() => FriendStatus, (friendStatus) => friendStatus.fromUser)
  receivedRequests: FriendStatus[];

  @Field(() => [User])
  async commonFriends(
    @Root() parent: User,
    @Ctx() ctx: Context
  ): Promise<User[]> {
    const { userId } = ctx.req;
    const bothUsersIds = [userId, parent.id];

    const friendStatuses = await FriendStatus.find({
      where: {
        toUserId: In(bothUsersIds),
        fromUserId: In(bothUsersIds),
        status: Status.Friends,
      },
    });

    // get the other user id (not 'me' id)
    const friendsIds = friendStatuses
      .map((friendStatus) =>
        friendStatus.fromUserId === userId
          ? friendStatus.toUserId
          : friendStatus.fromUserId
      )
      // filter out parent id (the other user's) not to cause himself to be his common friend
      .filter((friendId) => friendId !== parent.id);

    if (friendsIds.length === 0) return [];

    const friends = await User.find({ where: { id: In(friendsIds) } });

    return friends;
  }

  @Field(() => [User])
  async otherFriends(
    @Root() parent: User,
    @Ctx() ctx: Context
  ): Promise<User[]> {
    const { userId } = ctx.req;

    // take those that are not friends of 'me'
    const friendStatuses = await FriendStatus.find({
      where: [
        {
          status: Status.Friends,
          fromUserId: Not(userId),
          toUserId: parent.id,
        },
        {
          status: Status.Friends,
          fromUserId: parent.id,
          toUserId: Not(userId),
        },
      ],
    });

    const otherFriendsIds = friendStatuses
      .map((fStatus) =>
        fStatus.fromUserId === userId ? fStatus.toUserId : fStatus.fromUserId
      )
      // filter out parent's (user's) id
      .filter((id) => id !== parent.id);

    if (otherFriendsIds.length === 0) return [];

    const otherFriends = await User.find({
      where: { id: In(otherFriendsIds) },
    });

    return otherFriends;
  }
}
