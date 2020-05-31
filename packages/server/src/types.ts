import { Stream } from "stream";

export type File = {
  filename: string;
  mimetype: string;
  encoding: string;
  createReadStream: () => Stream;
};

export type UploadedFileResponse = {
  filename: string;
  mimetype: string;
  encoding: string;
  url: string;
};
