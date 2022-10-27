import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';

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
}
