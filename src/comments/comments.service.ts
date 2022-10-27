import { Injectable } from '@nestjs/common';
import { CreateCommentInput } from './dto/create-comment.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment) private commentsRepository: Repository<Comment>,
  ) {}
  create(createCommentInput: CreateCommentInput) {
    const newComment = this.commentsRepository.create(createCommentInput);
    return this.commentsRepository.save(newComment);
  }

  findAll() {
    return this.commentsRepository.find();
  }

  findOne(id: string) {
    return this.commentsRepository.findOneBy({ id });
  }

  async remove(id: string) {
    const comment = await this.commentsRepository.findOneBy({ id });
    this.commentsRepository.remove(comment);
    return comment;
  }
}
