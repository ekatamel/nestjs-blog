import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Patch,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/user.entity';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article-dto';
import { UpdateArticleDto } from './dto/update-article-dto';
import { ArticleDto } from './dto/article.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { diskStorage } from 'multer';
import path = require('path');
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

export const storage = {
  storage: diskStorage({
    destination: './images/articles',
    filename: (req, file, cb) => {
      const filename: string = path
        .parse(file.originalname)
        .name.replace(/\s/g, '');
      const extension: string = path.parse(file.originalname).ext;

      cb(null, `${filename}${extension}`);
    },
  }),
};

@ApiTags('Articles')
@Serialize(ArticleDto)
@Controller('articles')
export class ArticlesController {
  constructor(private articlesService: ArticlesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all articles' })
  @ApiResponse({
    status: 200,
    description: 'All blog articles',
  })
  getAllArticles() {
    return this.articlesService.getAllArticles();
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get article by ID' })
  @ApiResponse({
    status: 200,
    description: 'Article found by ID',
  })
  @ApiResponse({
    status: 404,
    description: "Article doesn't exist",
  })
  getArticleById(@Param('id') id: string) {
    return this.articlesService.getArticleById(id);
  }

  @Post()
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file', storage))
  @ApiOperation({ summary: 'Create new article' })
  @ApiResponse({
    status: 201,
    description: 'Article created',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  createArticle(
    @CurrentUser() user: User,
    @Body() createArticleDto: CreateArticleDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.articlesService.createArticle(user, createArticleDto, file);
  }

  @Patch('/:id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Update article by ID' })
  @ApiResponse({
    status: 201,
    description: 'Article updated',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  @ApiResponse({
    status: 404,
    description: "Article doesn't exist",
  })
  updateArticle(
    @Param('id') id: string,
    @Body() updateArticleDto: UpdateArticleDto,
  ) {
    return this.articlesService.updateArticle(id, updateArticleDto);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Delete article by ID' })
  @ApiResponse({
    status: 404,
    description: "Article doesn't exist",
  })
  @ApiResponse({
    status: 200,
    description: 'Article deleted successfully',
  })
  deleteArticle(@Param('id') articleId: string, @CurrentUser() user: User) {
    return this.articlesService.deleteArticle(articleId, user);
  }
}
