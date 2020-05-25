import { objectType } from "@nexus/schema";

export const File = objectType({
  name: "File",
  definition(t) {
    t.id("id");
    t.string("url");
    t.string("filename");
    t.string("mimetype");
    t.string("encoding");
  },
});
