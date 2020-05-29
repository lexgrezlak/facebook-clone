import { Post } from "./Post";
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { Field, ID, ObjectType, Root } from "type-graphql";
import { Length } from "class-validator";
import { FriendStatus } from "./FriendStatus";

// registerEnumType(Gender, {
//   name: "Gender",
// });

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column("text")
  firstName: string;

  @Field()
  @Column("text")
  lastName: string;

  @Field({ complexity: 3 })
  name(@Root() parent: User): string {
    return `${parent.firstName} ${parent.lastName}`;
  }

  @Field()
  @Column("text", { unique: true })
  email: string;

  @Column()
  passwordHash: string;

  @Field()
  @Column("date")
  birthday: Date;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @OneToMany(() => FriendStatus, (friendStatus) => friendStatus.fromUser)
  sentRequests: FriendStatus[];

  @OneToMany(() => FriendStatus, (friendStatus) => friendStatus.fromUser)
  receivedRequests: FriendStatus[];
}
