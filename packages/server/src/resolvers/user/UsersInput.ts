import { InputType, Field } from "type-graphql";

@InputType()
export class UsersInput {
  @Field()
  filter: string;
}
