import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CommentsService } from './comments.service';
import { Comment } from './entities/comment.entity';
import { CreateCommentInput } from './dto/create-comment.input';

@Resolver(() => Comment)
export class CommentsResolver {
  constructor(private readonly commentsService: CommentsService) {}

  @Mutation(() => Comment)
  createComment(
    @Args('createCommentInput') createCommentInput: CreateCommentInput,
  ) {
    return this.commentsService.create(createCommentInput);
  }

  @Query(() => [Comment], { name: 'comments' })
  findAll() {
    return this.commentsService.findAll();
  }

  @Query(() => Comment, { name: 'comment' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.commentsService.findOne(id);
  }

  @Mutation(() => Comment)
  removeComment(@Args('id', { type: () => String }) id: string) {
    return this.commentsService.remove(id);
  }
}
