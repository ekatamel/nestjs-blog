import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateArticleDto {
  @IsOptional()
  @IsString()
  @MinLength(10)
  @MaxLength(255)
  title: string;

  @IsOptional()
  @IsString()
  @MinLength(10)
  perex: string;

  @IsOptional()
  @IsString()
  @MinLength(10)
  content: string;

  @IsOptional()
  @IsString()
  imageId: string;
}
