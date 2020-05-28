import { scalarType } from "@nexus/schema";
import { GraphQLError } from "graphql";
import * as FileType from "file-type";

export const Upload = scalarType({
  name: "Upload",
  asNexusMethod: "upload", // We set this to be used as a method later as `t.upload()` if needed
  description: "The `Upload` scalar type represents a file upload.",
  serialize: () => {
    throw new GraphQLError("Upload serialization unsupported.");
  },
  parseValue: async (value) => {
    const upload = await value;
    const stream = upload.createReadStream();
    const fileType = await FileType.fromStream(stream);

    if (fileType?.mime !== upload.mimetype)
      throw new GraphQLError("Mime type does not match file content.");

    return upload;
  },
  parseLiteral: (ast) => {
    throw new GraphQLError("Upload literal unsupported.", ast);
  },
});
