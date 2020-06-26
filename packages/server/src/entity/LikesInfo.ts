import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class LikesInfo {
  @Field()
  likes: number;

  @Field()
  isLiked: boolean;
}
