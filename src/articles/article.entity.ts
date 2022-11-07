import { Comment } from '../comments/comment.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Image } from '../images/image.entity';

@Entity()
export class Article {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  perex: string;

  @Column()
  content: string;

  @Column()
  createdAt: string;

  @Column()
  lastUpdatedAt: string;

  // article.comments
  @OneToMany(() => Comment, (comment) => comment.article, {
    eager: true,
  })
  comments: Comment[];

  // article.image
  @OneToOne(() => Image, (image) => image.article, {
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinColumn()
  image: Image;
}
