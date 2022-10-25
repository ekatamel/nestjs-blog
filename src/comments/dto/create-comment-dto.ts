import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { PrimaryGeneratedColumn } from 'typeorm';

export class CreateCommentDto {
  @IsNotEmpty()
  articleId: string;

  // @IsNotEmpty()
  // user: string;

  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(500)
  content: string;
}
