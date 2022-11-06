import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { CreateCommentDto } from './dto/create-comment-dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentsRepository: Repository<Comment>,
  ) {}

  async createComment(createCommentDto: CreateCommentDto, user: User) {
    const { articleId, content } = createCommentDto;

    const newComment = this.commentsRepository.create({
      articleId,
      user,
      content,
      postedAt: Date.now().toString(),
      score: 0,
    });

    await this.commentsRepository.save(newComment);

    return newComment;
  }

  async getTotalScore(id: string) {
    const comment = await this.commentsRepository.findOneBy({ id });

    if (!comment) {
      throw new NotFoundException("Comment doesn't exist");
    }

    return comment.score;

    // const votes = comment?.votes.map((vote) => vote.value);
    // return votes?.reduce((a, b) => a + b, 0);
  }

  // REPLACED BY WEB SOCKET

  // async upvoteComment(id: string) {
  //   const comment = await this.commentsRepository.findOneBy({ id });
  //   if (!comment) {
  //     throw new NotFoundException("Comment doesn't exist");
  //   }
  //   await this.commentsRepository.update(id, {
  //     score: comment.score + 1,
  //   });
  //   return comment;
  // }

  // async downvoteComment(id: string) {
  //   const comment = await this.commentsRepository.findOneBy({ id });
  //   if (!comment) {
  //     throw new NotFoundException("Comment doesn't exist");
  //   }
  //   await this.commentsRepository.update(id, {
  //     score: comment.score - 1,
  //   });
  //   return comment;
  // }
}
