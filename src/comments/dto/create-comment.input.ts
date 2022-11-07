import { InputType, Int, Field } from '@nestjs/graphql';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

@InputType()
export class CreateCommentInput {
  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  @MaxLength(255)
  @Field()
  content: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  @Field()
  author: string;

  @Field()
  articleId: string;
}
