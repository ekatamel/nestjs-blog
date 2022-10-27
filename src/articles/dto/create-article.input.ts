import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateArticleInput {
  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  @MaxLength(255)
  @Field()
  title: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  @Field()
  perex: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  @Field()
  content: string;
}
