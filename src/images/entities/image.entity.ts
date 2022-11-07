import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Article } from 'src/articles/article.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';

@Entity()
@ObjectType()
export class Image {
  @PrimaryGeneratedColumn()
  @Field()
  id: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  articleId: string;

  @Field((type) => Article, { nullable: true })
  @OneToOne(() => Article, (article) => article.image)
  article?: Article;
}
