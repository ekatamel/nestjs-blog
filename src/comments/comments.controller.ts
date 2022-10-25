import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/user.entity';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment-dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Comments')
@Controller('comments')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Create new comment' })
  @ApiResponse({
    status: 201,
    description: 'Comment created',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  createComment(
    @Body() createCommentDto: CreateCommentDto,
    @CurrentUser() user: User,
  ) {
    return this.commentsService.createComment(createCommentDto, user);
  }

  @Get('/:commentId/score')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get total article score' })
  @ApiResponse({
    status: 404,
    description: "Comment doesn't exist",
  })
  getTotalScore(@Param('commentId') id: string) {
    return this.commentsService.getTotalScore(id);
  }

  // REPLACED BY WEB SOCKET

  // @Post('/:commentId/vote/up')
  // @UseGuards(AuthGuard)
  // upvoteComment(@Param('commentId') commentId: string) {
  //   return this.commentsService.upvoteComment(commentId);
  // }

  // @Post('/:commentId/vote/down')
  // @UseGuards(AuthGuard)
  // downvoteComment(@Param('commentId') commentId: string) {
  //   return this.commentsService.downvoteComment(commentId);
  // }
}
