import { Module } from '@nestjs/common';
import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './article.entity';
import { ImagesModule } from 'src/images/images.module';

@Module({
  imports: [TypeOrmModule.forFeature([Article]), ImagesModule],
  controllers: [ArticlesController],
  providers: [ArticlesService],
})
export class ArticlesModule {}
