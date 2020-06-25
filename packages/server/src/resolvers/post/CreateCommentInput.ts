import { Length } from "class-validator";
import { InputType, Field } from "type-graphql";

@InputType()
export class CreateCommentInput {
  @Field()
  @Length(1, 200)
  content: string;
}
