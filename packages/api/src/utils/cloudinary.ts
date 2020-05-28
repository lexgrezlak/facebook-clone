import cloudinary from "cloudinary";
import {
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_CLOUD_NAME,
} from "../config";

namespace ApolloServerFileUploads {
  export type File = {
    filename: string;
    mimetype: string;
    encoding: string;
    createReadStream: Function;
  };

  export type UploadedFileResponse = {
    filename: string;
    mimetype: string;
    encoding: string;
    url: string;
  };

  export interface Uploader {
    singleFileUploadResolver: (
      parent: any,
      { file }: { file: File }
    ) => Promise<UploadedFileResponse>;
  }
}

type CloudinaryUploadConfig = {
  cloudName: string;
  apiKey: any;
  apiSecret: string;
};

export class CloudinaryUploader implements ApolloServerFileUploads.Uploader {
  constructor(config: CloudinaryUploadConfig) {
    cloudinary.v2.config({
      cloud_name: config.cloudName,
      api_key: config.apiKey,
      api_secret: config.apiSecret,
    });
  }

  private createUploadStream(fileName: string, cb: Function): any {
    return cloudinary.v2.uploader.upload_stream(
      { public_id: fileName },
      (error, file) => cb(error, file)
    );
  }

  async singleFileUploadResolver(
    _parent: any,
    { file }: { file: ApolloServerFileUploads.File }
  ): Promise<ApolloServerFileUploads.UploadedFileResponse> {
    const { createReadStream, filename, mimetype, encoding } = await file;
    const stream = createReadStream();

    return new Promise((resolve, reject) => {
      const uploadStream = this.createUploadStream(
        filename,
        (error: any, result: any) => {
          if (error) return reject(error);
          return resolve({
            filename,
            mimetype,
            encoding,
            url: result.secure_url,
          } as ApolloServerFileUploads.UploadedFileResponse);
        }
      );

      stream.pipe(uploadStream);
    });
  }

  async multiFileUploadResolver(
    _parent: any,
    { files }: { files: ApolloServerFileUploads.File[] }
  ): Promise<ApolloServerFileUploads.UploadedFileResponse[]> {
    return Promise.all(
      files.map((file) => this.singleFileUploadResolver(null, { file }))
    );
  }
}

export const cloudinaryUploader = new CloudinaryUploader({
  cloudName: CLOUDINARY_CLOUD_NAME,
  apiKey: CLOUDINARY_API_KEY,
  apiSecret: CLOUDINARY_API_SECRET,
});
