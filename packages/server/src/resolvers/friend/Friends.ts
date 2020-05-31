import { Query, Resolver, Arg } from "type-graphql";
import { User } from "../../entity/User";
import { FriendStatus, Status } from "../../entity/FriendStatus";

@Resolver()
export class FriendsResolver {
  @Query(() => [User])
  async friends(@Arg("userId") userId: string): Promise<User[]> {
    const friendFriendStatuses = await FriendStatus.find({
      where: [
        { status: Status.Friends, fromUserId: userId },
        { status: Status.Friends, toUserId: userId },
      ],
    });

    const friendsIds = friendFriendStatuses.map((friendStatus) =>
      friendStatus.fromUserId === userId
        ? friendStatus.toUserId
        : friendStatus.fromUserId
    );

    const friends = await User.findByIds(friendsIds);

    return friends;
  }
}
