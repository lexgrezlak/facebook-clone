import { Post } from "./Post";
import { Field, ObjectType } from "type-graphql";
import { PageInfo } from "./PageInfo";

@ObjectType()
export class PostConnection {
  @Field(() => [Post])
  edges: Post[];

  @Field(() => PageInfo)
  pageInfo: PageInfo;
}
