import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Field, ID, ObjectType, registerEnumType } from "type-graphql";
import { Gender } from "../../../common/types";
import { Length } from "class-validator";

// registerEnumType(Gender, {
//   name: "Gender",
// });

@ObjectType()
@Entity("users")
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column("text")
  @Length(2, 20)
  firstName: string;

  @Field()
  @Column("text")
  lastName: string;

  @Field()
  @Column("text")
  email: string;

  @Column("text")
  passwordHash: string;

  @Field()
  @Column("date")
  birthday: Date;

  @Field()
  @Column("text")
  gender: string;
  // @Field(() => Gender)
  // @Column("enum", { nullable: false, enum: Gender })
  // gender: Gender;
}
