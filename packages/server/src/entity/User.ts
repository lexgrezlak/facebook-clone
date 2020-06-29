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
import { FriendshipStatus } from "../enums";

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

  // @Field(() => [Post])
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

  @Field(() => String, { nullable: true })
  async friendshipStatus(
    @Root() parent: User,
    @Ctx() ctx: Context
  ): Promise<FriendshipStatus> {
    const { userId } = ctx.req;

    const friendStatus = await FriendStatus.findOne({
      where: [
        { fromUserId: userId, toUserId: parent.id },
        { fromUserId: parent.id, toUserId: userId },
      ],
    });

    if (!friendStatus) return FriendshipStatus.Stranger;

    if (friendStatus.status === Status.Pending) {
      if (friendStatus.fromUserId === userId)
        return FriendshipStatus.MeSentRequest;
      return FriendshipStatus.MeReceivedRequest;
    }

    return FriendshipStatus.Friend;
  }

  @Field(() => [User])
  async friends(@Root() parent: User): Promise<User[]> {
    const friendStatuses = await FriendStatus.find({
      where: [
        {
          toUserId: parent.id,
          status: Status.Friends,
        },
        {
          fromUserId: parent.id,
          status: Status.Friends,
        },
      ],
    });

    // filter out parent id
    const friendsIds = friendStatuses.map((fStatus) =>
      fStatus.fromUserId === parent.id ? fStatus.toUserId : fStatus.fromUserId
    );

    if (friendsIds.length === 0) return [];

    const friends = await User.find({ where: { id: In(friendsIds) } });

    return friends;
  }
}
