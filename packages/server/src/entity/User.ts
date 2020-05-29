import { Post } from "./Post";
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { Field, ID, ObjectType, Root } from "type-graphql";
import { FriendStatus } from "./FriendStatus";

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
  fullName(@Root() parent: User): string {
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

  @Field({ nullable: true })
  @Column("text", { nullable: true })
  avatar: string;

  @Field()
  @Column("text", {
    default:
      "https://pixabay.com/get/53e9d4454953b10ff3d89960c62d3e7e123dd6e05550_640.jpg",
  })
  background: string;

  @Field(() => [Post])
  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @OneToMany(() => FriendStatus, (friendStatus) => friendStatus.fromUser)
  sentRequests: FriendStatus[];

  @OneToMany(() => FriendStatus, (friendStatus) => friendStatus.fromUser)
  receivedRequests: FriendStatus[];
}
