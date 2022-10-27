import { Module } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './article.entity';
import { ArticlesResolver } from './articles.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Article])],
  providers: [ArticlesService, ArticlesResolver],
})
export class ArticlesModule {}
