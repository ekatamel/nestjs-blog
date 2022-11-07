import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment-dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment } from './comment.model';

@Injectable()
export class CommentsService {
  constructor(@InjectModel('Comment') private commentModel: Model<Comment>) {}

  async createComment(createCommentDto: CreateCommentDto) {
    const { articleId, content } = createCommentDto;

    const newComment = new this.commentModel({
      articleId,
      content,
      postedAt: Date.now().toString(),
      score: 0,
    });

    const result = await newComment.save();

    return result;
  }

  async getTotalScore(id: string) {
    const comment = await this.commentModel.findOne({ id });

    if (!comment) {
      throw new NotFoundException("Comment doesn't exist");
    }

    return comment.score;
  }

  async upvoteComment(id: string) {
    const comment = await this.commentModel.findOne({ id });
    if (!comment) {
      throw new NotFoundException("Comment doesn't exist");
    }
    comment.score = comment.score + 1;
    const result = await comment.save();

    return result;
  }

  async downvoteComment(id: string) {
    const comment = await this.commentModel.findOne({ id });
    if (!comment) {
      throw new NotFoundException("Comment doesn't exist");
    }
    comment.score = comment.score - 1;
    const result = await comment.save();

    return result;
  }
}
