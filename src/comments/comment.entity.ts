import { Article } from '../articles/article.entity';
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
}
