import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article-dto';
import { User } from '../users/user.entity';

describe('UsersController', () => {
  let controller: ArticlesController;
  //   let fakeUsersService: Partial<UsersService>;
  //   let fakeAuthService: Partial<AuthService>;

  const user: User = {
    id: '1234567890123',
    email: 'test@test.com',
    password: 'sdfghjkl;',
    admin: false,
    articles: [],
    comments: [],
  };

  const articles = [
    {
      id: 'e5f1462e-cccb-40e6-b035-0e34124806e9',
      title: 'Cats are awesome Cats are awesome Cats are awesome ',
      perex: 'Cats are awesome Cats are awesome Cats are awesome',
      content: 'Cats are awesome Cats are awesome Cats are awesome',
      user: {
        id: '92931aac-fa76-475d-811f-ed0ee0044e4b',
      },
    },
    {
      id: 'ff56kj-cccb-40e6-b035-0e34124806e9',
      title: 'Dogs and cats are biggest friends',
      perex: 'Dogs and cats are biggest friends',
      content: 'Dogs and cats are biggest friends',
      user: {
        id: '92931aac-fa76-475d-811f-ed0ee0044e4b',
      },
    },
  ];

  beforeEach(async () => {
    const fakeArticlesService = {
      getAllArticles: () => Promise.resolve(articles),
      getArticleById: (id: string) => {
        return articles.find((item) => item.id === id);
      },
      createArticle: (article) => Promise.resolve(article),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArticlesController],
      providers: [
        {
          provide: ArticlesService,
          useValue: fakeArticlesService,
        },
      ],
    }).compile();

    controller = module.get<ArticlesController>(ArticlesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('getAllArticles returns all articles', async () => {
    const articles = await controller.getAllArticles();
    expect(articles).toHaveLength(2);
  });

  it('getArticleById returns article found by ID or error if not found', async () => {
    try {
      const article = await controller.getArticleById('randomId');
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
    }

    const articleDB = await controller.getArticleById(
      'ff56kj-cccb-40e6-b035-0e34124806e9',
    );

    expect(articleDB).toMatchObject(articles[1]);
  });
});
