import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './article.entity';
import { Repository } from 'typeorm';
import { UpdateArticleDto } from './dto/update-article-dto';
import { User } from 'src/users/user.entity';
import { ImagesService } from 'src/images/images.service';

@Injectable()
export class ArticlesService {
  constructor(
    private imageService: ImagesService,
    @InjectRepository(Article) private articlesRepository: Repository<Article>,
  ) {}

  async getAllArticles() {
    const articles = await this.articlesRepository.find();
    return articles;
  }

  async getArticleById(id: string): Promise<Article> {
    const article = await this.articlesRepository.findOneBy({ id });

    if (!article) {
      throw new NotFoundException("Article doesn't exist");
    }

    return article;
  }

  async createArticle(
    user: User,
    createArticleDto: CreateArticleDto,
    file: Express.Multer.File,
  ) {
    const { title, perex, content } = createArticleDto;

    const image = file ? await this.imageService.createImage(file) : null;
    const newArticle = this.articlesRepository.create({
      title,
      perex,
      content,
      image,
      user,
      createdAt: Date.now().toString(),
      lastUpdatedAt: Date.now().toString(),
    });

    await this.articlesRepository.save(newArticle);
    return newArticle;
  }

  async updateArticle(articleId: string, updateArticleDto: UpdateArticleDto) {
    const article = await this.getArticleById(articleId);

    if (!article) {
      throw new NotFoundException("Article doesn't exist");
    }

    Object.assign(article, updateArticleDto);

    return await this.articlesRepository.save(article);
  }

  async deleteArticle(articleId: string, user: User) {
    const article = await this.getArticleById(articleId);
    if (!article) {
      throw new NotFoundException("Article doesn't exist");
    }

    if (user.id != article.user.id) {
      throw new ForbiddenException(
        'You are not allowed to delete articles of other users',
      );
    }
    await this.articlesRepository.remove(article);
  }
}
