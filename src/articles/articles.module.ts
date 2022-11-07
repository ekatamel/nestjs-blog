import { Module } from '@nestjs/common';
import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './article.entity';
import { ImagesModule } from 'src/images/images.module';
import { ScheduleModule } from '@nestjs/schedule';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticleSchema } from './article.model';

@Module({
  imports: [
    // TypeOrmModule.forFeature([Article]),
    MongooseModule.forFeature([{ name: 'Article', schema: ArticleSchema }]),
    ImagesModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [ArticlesController],
  providers: [ArticlesService],
})
export class ArticlesModule {}
