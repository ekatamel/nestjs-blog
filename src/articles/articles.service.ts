import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article-dto';
import { UpdateArticleDto } from './dto/update-article-dto';
import { ImagesService } from '../images/images.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Article } from './article.model';
import { Image } from 'src/images/image.model';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectModel('Article') private articleModel: Model<Article>,
    private imageService: ImagesService,
  ) {}

  async getAllArticles() {
    const articles = await this.articleModel.find();
    return articles;
  }

  async getArticleById(id: string): Promise<Article> {
    const article = await this.articleModel.findOne({ id });

    if (!article) {
      throw new NotFoundException("Article doesn't exist");
    }

    return article;
  }

  async createArticle(
    createArticleDto: CreateArticleDto,
    file: Express.Multer.File,
  ) {
    const { title, perex, content } = createArticleDto;

    const image = file ? await this.imageService.createImage(file) : null;

    const newArticle = new this.articleModel({
      id: Math.random().toString(),
      title,
      perex,
      content,
      imageId: image.id,
      createdAt: Date.now().toString(),
      lastUpdatedAt: Date.now().toString(),
    });

    const result = await newArticle.save();
    return result;
  }

  async updateArticle(articleId: string, updateArticleDto: UpdateArticleDto) {
    await this.articleModel.updateOne(
      { id: articleId },
      { ...updateArticleDto },
    );
    const article = await this.getArticleById(articleId);

    return article;
  }

  async deleteArticle(articleId: string) {
    const article = await this.getArticleById(articleId);
    if (!article) {
      throw new NotFoundException("Article doesn't exist");
    }

    await this.articleModel.remove(article);
  }
}
