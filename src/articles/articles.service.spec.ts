import { Test, TestingModule } from '@nestjs/testing';
import { ArticlesService } from './articles.service';
import { ImagesService } from '../images/images.service';
import { Article } from './article.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Image } from '../images/image.entity';
import { CreateArticleDto } from './dto/create-article-dto';
import { User } from '../users/user.entity';
import { UpdateArticleDto } from './dto/update-article-dto';
import { fileToBuffer } from './tests/utils';
import streamBuffers = require('stream-buffers');
import { NotFoundException } from '@nestjs/common';

describe('ArticlesService', () => {
  let articleService: ArticlesService;
  let fakeImagesService;

  const article = {
    id: 'e5f1462e-cccb-40e6-b035-0e34124806e9',
    title: 'Cats are awesome Cats are awesome Cats are awesome ',
    perex: 'Cats are awesome Cats are awesome Cats are awesome',
    content: 'Cats are awesome Cats are awesome Cats are awesome',
    user: {
      id: '92931aac-fa76-475d-811f-ed0ee0044e4b',
    },
  };

  const user: User = {
    id: '1234567890123',
    email: 'test@test.com',
    password: 'sdfghjkl;',
    admin: false,
    articles: [],
    comments: [],
  };

  beforeEach(async () => {
    const fakeImagesService = {
      createImage: (file: Express.Multer.File) => {
        const image = {
          id: 'randomCatImageId',
          name: file.filename,
        };
        return Promise.resolve(image);
      },
    };

    const mockArticlesRepository = {
      save: jest.fn().mockImplementation((article) => Promise.resolve(article)),
      create: jest.fn().mockImplementation((article) => article),
      findOneBy: jest.fn().mockImplementation(() => Promise.resolve(article)),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ArticlesService,
        {
          provide: ImagesService,
          useValue: fakeImagesService,
        },
        {
          provide: getRepositoryToken(Article),
          useValue: mockArticlesRepository,
        },
      ],
    }).compile();

    articleService = module.get<ArticlesService>(ArticlesService);
  });

  it('should be defined', () => {
    expect(articleService).toBeDefined();
  });

  it('should create a new article - with no image - and return it', async () => {
    const createArticleDto: CreateArticleDto = {
      title: 'Some random title here',
      perex: 'Some random perex here',
      content: 'Some random content here',
    };

    const article = await articleService.createArticle(
      user,
      createArticleDto,
      null,
    );

    expect(article).toMatchObject({
      ...createArticleDto,
    });
  });

  it('should create article with image referred by imageId', async () => {
    const imageBuffer = (await fileToBuffer(
      __dirname + '/tests/testing-cat.jpeg',
    )) as Buffer;

    const myReadableStreamBuffer = new streamBuffers.ReadableStreamBuffer({
      frequency: 10, // in milliseconds.
      chunkSize: 2048, // in bytes.
    });

    myReadableStreamBuffer.put(imageBuffer as Buffer);
    const image: Express.Multer.File = {
      buffer: imageBuffer,
      fieldname: 'fieldname-defined-in-@UseInterceptors-decorator',
      originalname: 'original-filename',
      encoding: '7bit',
      mimetype: 'file-mimetyp',
      destination: 'destination-path',
      filename: 'testing-cat.jpg',
      path: '/path/to/cat/image',
      size: 955578,
      stream: myReadableStreamBuffer,
    };

    const createArticleDto: CreateArticleDto = {
      title: 'Cat article with nice picture of cat',
      perex: 'Cat perex with nice picture of cat',
      content: 'Cat content with nice picture of cat',
    };

    const article = await articleService.createArticle(
      user,
      createArticleDto,
      image,
    );

    expect(article).toMatchObject({
      ...createArticleDto,
      image: {
        id: 'randomCatImageId',
        name: 'testing-cat.jpg',
      },
    });
  });

  it('should return article by id', async () => {
    const articleDB = await articleService.getArticleById(
      'e5f1462e-cccb-40e6-b035-0e34124806e9',
    );

    expect(articleDB).toMatchObject(article);
  });

  it("throws error if article wasn't found by ID", async () => {
    try {
      await articleService.getArticleById('123456');
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
    }
  });

  it('updates article', async () => {
    const newContent: UpdateArticleDto = {
      title: 'Cats are better than dogs Cats are better than dogs',
      perex: 'Cats are better than dogs Cats are better than dogs',
      content: 'Cats are better than dogsCats are better than dogs',
      imageId: '1256789',
    };

    const articleDB = await articleService.updateArticle(
      'e5f1462e-cccb-40e6-b035-0e34124806e9',
      newContent,
    );

    expect(articleDB).toMatchObject(article);
  });

  it('throws error if user tries to delete article of someone else', async () => {
    try {
      await articleService.deleteArticle(
        'e5f1462e-cccb-40e6-b035-0e34124806e9',
        user,
      );
    } catch (error) {
      expect(error.message).toBe(
        'You are not allowed to delete articles of other users',
      );
    }
  });
});
