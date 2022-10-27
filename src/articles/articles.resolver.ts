import { Resolver, Query, Mutation, Args, ResolveField } from '@nestjs/graphql';
import { Article } from './article.entity';
import { ArticlesService } from './articles.service';
import { CreateArticleInput } from './dto/create-article.input';

@Resolver((of) => Article)
export class ArticlesResolver {
  constructor(private articleService: ArticlesService) {}

  @Query((returns) => [Article])
  articles() {
    return this.articleService.findAllArticles();
  }

  @Mutation((returns) => Article)
  createArticle(
    @Args('createArticleInput') createArticleInput: CreateArticleInput,
  ) {
    console.log(createArticleInput);
    return this.articleService.createArticle(createArticleInput);
  }

  @Query((returns) => Article)
  getArticle(@Args('id', { type: () => String }) id: string) {
    return this.articleService.findArticleById(id);
  }
}
