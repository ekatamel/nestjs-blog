import { Expose, Transform } from 'class-transformer';
import { Image } from 'src/images/image.entity';

export class ArticleDto {
  @Expose()
  id: string;

  @Expose()
  title: string;

  @Expose()
  perex: string;

  @Expose()
  content: string;

  @Expose()
  createdAt: string;

  @Expose()
  lastUpdatedAt: string;

  @Expose()
  comments: Comment[];

  @Transform(({ obj }) => obj.image.id)
  @Expose()
  image: Image;

  @Transform(({ obj }) => obj.user.id)
  @Expose()
  userId: string;
}
