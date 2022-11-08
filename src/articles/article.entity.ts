import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { Comment } from 'src/comments/entities/comment.entity';
import { Image } from 'src/images/entities/image.entity';

@Entity()
@ObjectType()
export class Article {
  @PrimaryGeneratedColumn()
  @Field()
  id: string;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column()
  perex: string;

  @Field()
  @Column()
  content: string;

  @Field({ nullable: true })
  @Column()
  imageId: string;

  @Field((type) => [Comment], { nullable: true })
  @OneToMany(() => Comment, (comment) => comment.article, { eager: true })
  comments?: Comment[];

  @Field((type) => Image, { nullable: true })
  @OneToOne(() => Image, (image) => image.article, {
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinColumn()
  image?: Image;

  @Field()
  @Column()
  createdAt: string;

  @Field()
  @Column()
  lastUpdatedAt: string;
}
