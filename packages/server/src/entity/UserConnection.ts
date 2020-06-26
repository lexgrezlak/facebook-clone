import { Field, ObjectType } from "type-graphql";
import { PageInfo } from "./PageInfo";
import { User } from "./User";

@ObjectType()
export class UserConnection {
  @Field(() => [User])
  edges: User[];

  @Field(() => PageInfo)
  pageInfo: PageInfo;
}
