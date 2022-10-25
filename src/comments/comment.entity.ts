import { Article } from '../articles/article.entity';
import { User } from '../users/user.entity';
import { Vote } from '../votes/vote.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  articleId: string;

  @Column()
  content: string;

  @Column()
  postedAt: string;

  @Column()
  score: number;

  // comment.article
  @ManyToOne(() => Article, (article) => article.comments)
  article: Article;

  // comment.user
  @ManyToOne(() => User, (user) => user.comments)
  user: User;

  //comment.votes
  @OneToMany(() => Vote, (vote) => vote.comment)
  votes: Vote[];
}
