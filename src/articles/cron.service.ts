import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { ArticlesService } from './articles.service';

@Injectable()
export class CronService {
  constructor(private articleService: ArticlesService) {}
  private readonly logger = new Logger(CronService.name);
  @Cron('45 * * * * *')
  async handleCron() {
    const articles = await this.articleService.getAllArticles();
    console.log(JSON.stringify(articles));
  }
}
