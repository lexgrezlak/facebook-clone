import { CommentsInfo } from "./CommentsInfo";
import { LikesInfo } from "./LikesInfo";
import { PostLike } from "./PostLike";
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  JoinTable,
} from "typeorm";
import { Field, ID, ObjectType, Root, Ctx } from "type-graphql";
import { User } from "./User";
import { Context } from "../context";
import { Comment } from "./Comment";

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

  @Field(() => [Comment])
  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];

  @Field()
  @Column("text")
  content: string;

  @Field()
  @Column("timestamp", { default: () => "CURRENT_TIMESTAMP(6)" })
  createdAt: Date;

  @Field(() => [PostLike])
  @OneToMany(() => PostLike, (postLike) => postLike.post)
  postLikes: PostLike[];

  @Field(() => CommentsInfo)
  async commentsInfo(@Root() parent: Post): Promise<CommentsInfo> {
    // amount of comments
    const comments = await Comment.count({ where: { postId: parent.id } });

    return { comments };
  }

  @Field(() => LikesInfo)
  async likesInfo(
    @Root() parent: Post,
    @Ctx() ctx: Context
  ): Promise<LikesInfo> {
    const { userId } = ctx.req;
    const likes = await PostLike.count({ where: { postId: parent.id } });

    const postLike = await PostLike.findOne({
      where: { postId: parent.id, userId },
    });
    const isLiked = !!postLike;

    return { likes, isLiked };
  }
}
