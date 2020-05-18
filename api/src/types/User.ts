import { objectType } from "@nexus/schema";

export const User = objectType({
  name: "User",
  definition(t) {
    t.model.id();
    t.model.firstName();
    t.model.lastName();
    t.model.email();
    t.model.birthday();
    t.model.gender();
    t.model.sentFriendInvitations();
    t.model.receivedFriendInvitations();
    t.model.posts({ pagination: false });
  },
});
