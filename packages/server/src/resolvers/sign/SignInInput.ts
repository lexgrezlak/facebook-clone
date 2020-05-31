import { Length, IsEmail } from "class-validator";
import { InputType, Field } from "type-graphql";

@InputType()
export class SignInInput {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @Length(2, 50)
  password: string;
}
