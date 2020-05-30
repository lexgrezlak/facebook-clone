import { Query, Resolver, Arg } from "type-graphql";
import { User } from "../entity/User";
import { Status, FriendStatus } from "../entity/FriendStatus";

@Resolver()
export class FriendsResolver {
  @Query(() => [User])
  async friends(@Arg("userId") userId: string): Promise<User[]> {
    const friendFriendStatuses = await FriendStatus.find({
      where: [
        { status: Status.FRIENDS, fromUserId: userId },
        { status: Status.FRIENDS, toUserId: userId },
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
