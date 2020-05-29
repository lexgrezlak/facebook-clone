import { objectType } from "@nexus/schema";

export const PostConnection = objectType({
  name: "PostConnection",
  definition(t) {
    t.field("edges", { type: "Post", list: true });
    t.field("pageInfo", { type: "PageInfo" });
  },
});
