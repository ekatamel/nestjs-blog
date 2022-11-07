import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { Article } from 'src/articles/article.entity';

@Entity()
@ObjectType()
export class Comment {
  @PrimaryGeneratedColumn()
  @Field()
  id: string;

  @Field()
  @Column()
  content: string;

  @Field()
  @Column()
  author: string;

  @Field((type) => String)
  @Column()
  articleId: string;

  @Field((type) => Article)
  @ManyToOne(() => Article, (article) => article.comments)
  article?: Article;
}
