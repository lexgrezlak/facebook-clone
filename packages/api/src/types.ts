import { PostConnection } from "./types/PostConnection";
import { PageInfo } from "./types/PageInfo";
import { Query } from "./types/Query";
import { Mutation } from "./types/Mutation";
import { Post } from "./types/Post";
import { User } from "./types/User";
import { FriendStatus } from "./types/FriendStatus";
import { File } from "./types/File";
import { Upload } from "./types/Upload";

export default [
  Query,
  Mutation,
  Post,
  User,
  FriendStatus,
  File,
  Upload,
  PageInfo,
  PostConnection,
];
