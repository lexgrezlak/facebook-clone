import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class CommentsInfo {
  @Field()
  comments: number;
}
