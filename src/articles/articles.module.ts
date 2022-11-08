import { Module } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './article.entity';
import { ArticlesResolver } from './articles.resolver';
import { ImagesModule } from 'src/images/images.module';

@Module({
  imports: [TypeOrmModule.forFeature([Article]), ImagesModule],
  providers: [ArticlesService, ArticlesResolver],
})
export class ArticlesModule {}
