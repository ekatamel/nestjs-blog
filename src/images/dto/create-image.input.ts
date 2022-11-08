import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateImageInput {
  // @IsNotEmpty()
  // @IsString()
  // @MinLength(10)
  // @MaxLength(255)
  @Field()
  imageName: string;

  // @Field({ nullable: true })
  // articleId: string;
}
