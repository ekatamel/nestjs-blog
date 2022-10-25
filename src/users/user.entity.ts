import { Article } from '../articles/article.entity';
import { Comment } from '../comments/comment.entity';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: true })
  admin: boolean;

  // user.articles
  @OneToMany(() => Article, (article) => article.user)
  articles: Article[];

  // user.comments
  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];
}
