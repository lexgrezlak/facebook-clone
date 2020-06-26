import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class PageInfo {
  @Field()
  hasNextPage: boolean;

  @Field()
  endCursor: number;
}
