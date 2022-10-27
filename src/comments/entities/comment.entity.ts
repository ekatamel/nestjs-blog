import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';

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
}
