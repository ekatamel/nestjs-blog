import { Server, Socket } from 'socket.io';
import {
  WsException,
  WebSocketServer,
  SubscribeMessage,
  WebSocketGateway,
  ConnectedSocket,
  MessageBody,
} from '@nestjs/websockets';
import { NewVoteDto } from './dto/new-vote-dto';
import { VotesService } from './votes.service';
import { Vote } from './vote.entity';
import { CommentsService } from 'src/comments/comments.service';
import { VotesErrorTypes } from './types';

@WebSocketGateway()
export class VotesGateway {
  constructor(
    private votesService: VotesService,
    private commentsService: CommentsService,
  ) {}
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('vote')
  async handleMessage(
    @MessageBody() data: NewVoteDto,
    @ConnectedSocket() client: Socket,
  ) {
    const votingResult: any = await this.votesService.voteOnComment(
      data,
      client,
    );
    if (votingResult instanceof Vote) {
      this.server.emit('vote', data);
    } else if (votingResult === VotesErrorTypes.DuplicateVote) {
      throw new WsException('You already votes on this comment!');
    } else if (votingResult === VotesErrorTypes.CommentNotExist) {
      throw new WsException('Comment with this ID does not exist');
    }
  }
}
