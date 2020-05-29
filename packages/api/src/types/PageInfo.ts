import { objectType } from "@nexus/schema";

export const PageInfo = objectType({
  name: "PageInfo",
  definition(t) {
    t.int("endCursor");
    t.boolean("hasNextPage");
  },
});
