import { IsEnum, IsString } from 'class-validator';
import { VoteValue } from '../types';

export class NewVoteDto {
  @IsEnum(VoteValue)
  value: VoteValue;

  @IsString()
  commentId: string;
}
