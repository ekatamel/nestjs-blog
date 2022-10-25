import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { VoteValue } from './types';
import { Comment } from '../comments/comment.entity';

@Entity()
export class Vote {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    enum: VoteValue,
    default: VoteValue.Upvote,
  })
  value: VoteValue;

  @Column()
  ip: string;

  @ManyToOne(() => Comment, (comment) => comment.votes)
  comment: Comment;
}
