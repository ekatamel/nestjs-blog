import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateArticleDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  @MaxLength(255)
  title: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  perex: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  content: string;

  // @IsOptional()
  // file: Express.Multer.File;
}
