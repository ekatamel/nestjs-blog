import { Module } from '@nestjs/common';
import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './article.entity';
import { ImagesModule } from 'src/images/images.module';
import { ScheduleModule } from '@nestjs/schedule';
import { CronService } from './cron.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Article]),
    ImagesModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [ArticlesController],
  providers: [ArticlesService, CronService],
})
export class ArticlesModule {}
