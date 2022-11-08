import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './article.entity';
import { Repository } from 'typeorm';
import { UpdateArticleDto } from './dto/update-article-dto';
import { CreateArticleInput } from './dto/create-article.input';
import { ImagesService } from 'src/images/images.service';

@Injectable()
export class ArticlesService {
  constructor(
    private imageService: ImagesService,
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
    const { imageId, title, perex, content } = createArticleInput;

    const newArticle = this.articlesRepository.create({
      title,
      perex,
      content,
      imageId,
      createdAt: Date.now().toString(),
      lastUpdatedAt: Date.now().toString(),
    });

    return this.articlesRepository.save(newArticle);
  }
}
