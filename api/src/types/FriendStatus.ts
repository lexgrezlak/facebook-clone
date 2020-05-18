import { objectType } from "@nexus/schema";

export const FriendStatus = objectType({
  name: "FriendStatus",
  definition(t) {
    t.model.id();
    t.model.statusId();
    t.model.fromUserId();
    t.model.toUserId();
    t.model.sender();
    t.model.receiver();
    t.model.sentTime();
    t.model.responseTime();
  },
});
