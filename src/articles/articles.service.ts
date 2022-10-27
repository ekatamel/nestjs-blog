import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './article.entity';
import { Repository } from 'typeorm';
import { UpdateArticleDto } from './dto/update-article-dto';
import { CreateArticleInput } from './dto/create-article.input';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article) private articlesRepository: Repository<Article>,
  ) {}

  async findAllArticles() {
    return this.articlesRepository.find();
  }

  async findArticleById(id: string) {
    return this.articlesRepository.findOneBy({ id });
  }

  async createArticle(
    createArticleInput: CreateArticleInput,
  ): Promise<Article> {
    const newArticle = this.articlesRepository.create(createArticleInput);
    return this.articlesRepository.save(newArticle);
  }
}
