import { Module } from '@nestjs/common';
import { ArticlesModule } from './articles/articles.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './articles/article.entity';
import { CommentsModule } from './comments/comments.module';
import { ImagesModule } from './images/images.module';
import { UsersModule } from './users/users.module';
import { User } from './users/user.entity';
import { Image } from './images/image.entity';
import { Comment } from './comments/comment.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { VotesModule } from './votes/votes.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    ArticlesModule,
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'postgres',
          autoLoadEntities: true,
          synchronize: true,
          host: configService.get('DB_HOST'),
          port: configService.get('DB_PORT'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_DATABASE'),
          entities: [Article, User, Comment, Image],
        };
      },
    }),
    CommentsModule,
    ImagesModule,
    UsersModule,
    VotesModule,
  ],
  providers: [],
})
export class AppModule {}

// docker run --name postgres-nest -p 5432:5432 -e POSTGRES_PASSWORD=postgres -d postgres
