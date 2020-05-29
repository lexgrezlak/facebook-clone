import { Length, IsEmail, MinDate, MaxDate, IsDate } from "class-validator";
import { InputType, Field } from "type-graphql";
import { IsEmailUnique } from "./IsEmailUnique";

@InputType()
export class SignUpInput {
  @Field()
  @Length(1, 20)
  firstName: string;

  @Field()
  @Length(1, 20)
  lastName: string;

  @Field()
  @IsEmail()
  @IsEmailUnique({ message: "Email already in use" })
  email: string;

  @Field()
  @Length(2, 50)
  password: string;

  @Field()
  @IsDate()
  @MinDate(new Date(1900, 12, 12))
  @MaxDate(new Date(2018, 12, 12))
  birthday: Date;
}
