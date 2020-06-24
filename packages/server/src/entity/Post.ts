import { LikesInfo } from "./LikesInfo";
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
import { Field, ID, ObjectType, Root, Ctx } from "type-graphql";
import { User } from "./User";
import { Context } from "../context";

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

  @Field(() => [PostLike])
  @OneToMany(() => PostLike, (postLike) => postLike.post)
  postLikes: PostLike[];

  @Field(() => Number)
  async likes(@Root() parent: Post): Promise<number> {
    const postLikes = await PostLike.find({ where: { postId: parent.id } });
    return postLikes.length;
  }

  @Field(() => LikesInfo)
  async likesInfo(
    @Root() parent: Post,
    @Ctx() ctx: Context
  ): Promise<LikesInfo> {
    const { userId } = ctx.req;
    const postLikes = await PostLike.find({ where: { postId: parent.id } });
    const likes = postLikes.length;
    const isLiked = !!postLikes.find((postLike) => postLike.userId === userId);

    return { likes, isLiked };
  }

  @Field(() => Boolean)
  async isLiked(@Root() parent: Post, @Ctx() ctx: Context): Promise<boolean> {
    const { userId } = ctx.req;
    const postLike = await PostLike.findOne({
      where: { postId: parent.id, userId },
    });

    return !!postLike;
  }
}
