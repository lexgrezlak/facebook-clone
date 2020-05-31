import { File } from "./../types";
import { GraphQLUpload } from "apollo-server-express";
import { User } from "./../entity/User";
import { Context } from "./../context";
import { Resolver, Arg, Mutation, Ctx } from "type-graphql";
import { cloudinaryUploader } from "../cloudinary";

@Resolver()
export class UpdateAvatarResolver {
  @Mutation(() => String)
  async updateAvatar(
    //@ts-ignore
    @Arg("file", () => GraphQLUpload) file: File,
    @Ctx() ctx: Context
  ) {
    const uploadedFile = await cloudinaryUploader.singleFileUploadResolver.bind(
      cloudinaryUploader
    )(null, { file });

    const { url: avatar } = uploadedFile;
    const { userId } = ctx.req;
    await User.update({ id: userId }, { avatar });

    return avatar;
  }
}
