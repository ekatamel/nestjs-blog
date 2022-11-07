import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment-dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Comments')
@Controller('comments')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @Post()
  createComment(@Body() createCommentDto: CreateCommentDto) {
    return this.commentsService.createComment(createCommentDto);
  }

  @Get('/:commentId/score')
  getTotalScore(@Param('commentId') id: string) {
    return this.commentsService.getTotalScore(id);
  }

  @Post('/:commentId/vote/up')
  upvoteComment(@Param('commentId') commentId: string) {
    return this.commentsService.upvoteComment(commentId);
  }

  @Post('/:commentId/vote/down')
  downvoteComment(@Param('commentId') commentId: string) {
    return this.commentsService.downvoteComment(commentId);
  }
}
