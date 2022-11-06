import { Test, TestingModule } from '@nestjs/testing';
import { CommentsService } from './comments.service';
import { ImagesService } from '../images/images.service';
import { Comment } from './comment.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Image } from '../images/image.entity';
import { User } from '../users/user.entity';
import streamBuffers = require('stream-buffers');
import { NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment-dto';

describe('ArticlesService', () => {
  let commentsService: CommentsService;

  const comment = {
    id: 'e5f1462e-cccb-40e6-b035-0e34124806e9',
    articleId: '1245678',
    content: 'Comment content',
    score: 5,
  };

  //   const article = {
  //     id: 'e5f1462e-cccb-40e6-b035-0e34124806e9',
  //     title: 'Cats are awesome Cats are awesome Cats are awesome ',
  //     perex: 'Cats are awesome Cats are awesome Cats are awesome',
  //     content: 'Cats are awesome Cats are awesome Cats are awesome',
  //     createdAt: '1667753631851',
  //     lastUpdatedAt: '1667753631851',
  //     user: {
  //       id: '92931aac-fa76-475d-811f-ed0ee0044e4b',
  //     },
  //   };

  const user: User = {
    id: '1234567890123',
    email: 'test@test.com',
    password: 'sdfghjkl;',
    admin: false,
    articles: [],
    comments: [],
  };

  beforeEach(async () => {
    const mockCommentsRepository = {
      save: jest.fn().mockImplementation((comment) => Promise.resolve(comment)),
      create: jest.fn().mockImplementation((comment) => comment),
      findOneBy: jest.fn().mockImplementation(() => Promise.resolve(comment)),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommentsService,
        {
          provide: getRepositoryToken(Comment),
          useValue: mockCommentsRepository,
        },
      ],
    }).compile();

    commentsService = module.get<CommentsService>(CommentsService);
  });

  it('should be defined', () => {
    expect(commentsService).toBeDefined();
  });

  it('should create comment connected to article and user by ID', async () => {
    const createCommentDto: CreateCommentDto = {
      articleId: 'randomArticleId',
      content: 'Some content',
    };

    const commentDB = await commentsService.createComment(
      createCommentDto,
      user,
    );

    expect(commentDB).toMatchObject({
      articleId: 'randomArticleId',
      content: 'Some content',
    });
  });

  it('should return total score of the comment and return error if comment was not found', async () => {
    try {
      await commentsService.getTotalScore('randomCommentId');
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
    }
  });

  it('should return total score of the comment and return error if comment was not found', async () => {
    const score = await commentsService.getTotalScore(
      'e5f1462e-cccb-40e6-b035-0e34124806e9',
    );

    expect(score).toBe(comment.score);
  });
});
