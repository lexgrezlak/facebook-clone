import { objectType } from "@nexus/schema";

export const FriendStatus = objectType({
  name: "FriendStatus",
  definition(t) {
    t.model.id();
    // statusId of 0 is strangers
    // statusId of 1 is friends
    // statusId of 2 is invitation pending
    t.model.statusId();
    t.model.fromUserId();
    t.model.toUserId();
    t.model.sender();
    t.model.receiver();
    t.model.sentTime();
    t.model.responseTime();
  },
});
