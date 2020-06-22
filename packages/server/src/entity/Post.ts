import { PostLike } from "./PostLike";
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from "typeorm";
import { Field, ID, ObjectType, Root } from "type-graphql";
import { User } from "./User";

@ObjectType()
@Entity()
export class Post extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  userId: string;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn()
  user: User;

  @Field()
  @Column("text")
  content: string;

  @Field()
  @Column("timestamp", { default: () => "CURRENT_TIMESTAMP(6)" })
  createdAt: Date;

  @OneToMany(() => PostLike, (postLike) => postLike.post)
  postLikes: PostLike[];

  // @Field()
  // @Column({ default: 0 })
  // likes: number;

  // @Field(() => [User])
  // @ManyToMany(() => User, (user) => user.likedPosts)
  // @JoinTable({
  //   name: "userWhoLikePost",
  //   joinColumn: {
  //     name: "postId",
  //     referencedColumnName: "id",
  //   },
  //   inverseJoinColumn: {
  //     name: "userId",
  //     referencedColumnName: "id",
  //   },
  // })
  // usersWhoLike: User[];
}
