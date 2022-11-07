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
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article-dto';
import { UpdateArticleDto } from './dto/update-article-dto';
import { ArticleDto } from './dto/article.dto';
import { Serialize } from '../interceptors/serialize.interceptor';
import path = require('path');
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import * as multerGoogleStorage from 'multer-google-storage';
import { extname } from 'path';
import { diskStorage } from 'multer';

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

// export const storage = {
//   storage: multerGoogleStorage.storageEngine({
//     projectId: 'phonic-envoy-367811',
//     keyFilename: './src/storage/key.json',
//     bucket: 'blog-images-nestjs',
//     filename: (req, file, cb) => {
//       const name = file.originalname.split('.');
//       const fileExtName = extname(file.originalname);
//       const randomName = Array(4)
//         .fill(null)
//         .map(() => {
//           return Math.round(Math.random() * 16).toString(16);
//         })
//         .join('');
//       cb(null, `${name}-${randomName}${fileExtName}`);
//     },
//   }),
// };

@ApiTags('Articles')
@Serialize(ArticleDto)
@UseInterceptors(FileInterceptor('file', storage))
@Controller('articles')
export class ArticlesController {
  constructor(private articlesService: ArticlesService) {}

  @Get()
  getAllArticles() {
    return this.articlesService.getAllArticles();
  }

  @Get('/:id')
  getArticleById(@Param('id') id: string) {
    return this.articlesService.getArticleById(id);
  }

  @Post()
  createArticle(
    @Body() createArticleDto: CreateArticleDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.articlesService.createArticle(createArticleDto, file);
  }

  @Patch('/:id')
  updateArticle(
    @Param('id') id: string,
    @Body() updateArticleDto: UpdateArticleDto,
  ) {
    return this.articlesService.updateArticle(id, updateArticleDto);
  }

  @Delete('/:id')
  deleteArticle(@Param('id') articleId: string) {
    return this.articlesService.deleteArticle(articleId);
  }
}
