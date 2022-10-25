import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from '../comments/comment.entity';
import { Repository } from 'typeorm';
import { NewVoteDto } from './dto/new-vote-dto';
import { Vote } from './vote.entity';
import { Socket } from 'socket.io';
import { VotesErrorTypes } from './types';

@Injectable()
export class VotesService {
  constructor(
    @InjectRepository(Comment) private commentsRepository: Repository<Comment>,
    @InjectRepository(Vote) private votesRepository: Repository<Vote>,
  ) {}

  async voteOnComment(newVoteDto: NewVoteDto, client: Socket) {
    const { commentId, value } = newVoteDto;

    const comment = await this.commentsRepository.findOneBy({ id: commentId });

    if (!comment) {
      return VotesErrorTypes.CommentNotExist;
    }

    const ip = client.conn.remoteAddress;
    const votesFromUserOnComment = await this.votesRepository
      .createQueryBuilder('vote')
      .leftJoinAndSelect('vote.comment', 'comment')
      .where('comment.id = :id', { id: comment.id })
      .andWhere('vote.ip = :ip', { ip: ip })
      .getOne();

    if (votesFromUserOnComment != null) {
      return VotesErrorTypes.DuplicateVote;
    }

    const vote = this.votesRepository.create({
      ip,
      comment,
      value,
    });

    await this.votesRepository.save(vote);
  }
}
