import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsModule } from 'src/comments/comments.module';
import { Vote } from './vote.entity';
import { VotesGateway } from './votes.getaway';
import { VotesService } from './votes.service';
import { Comment } from 'src/comments/comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Vote, Comment]), CommentsModule],
  providers: [VotesService, VotesGateway],
})
export class VotesModule {}
