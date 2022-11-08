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
  imageName: string;

  // @Field({ nullable: true })
  // @Column()
  // articleId: string;

  @Field((type) => Article, { nullable: true })
  @OneToOne(() => Article, (article) => article.image)
  article?: Article;
}
