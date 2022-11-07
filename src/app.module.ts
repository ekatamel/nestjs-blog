import { Module } from '@nestjs/common';
import { ArticlesModule } from './articles/articles.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './articles/article.entity';
import { CommentsModule } from './comments/comments.module';
import { ImagesModule } from './images/images.module';
import { Image } from './images/image.entity';
import { Comment } from './comments/comment.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    // ConfigModule.forRoot({
    //   isGlobal: true,
    //   envFilePath: `.env.${process.env.NODE_ENV}`,
    // }),
    ArticlesModule,
    // TypeOrmModule.forRootAsync({
    //   inject: [ConfigService],
    //   useFactory: (configService: ConfigService) => {
    //     return {
    //       type: 'postgres',
    //       autoLoadEntities: true,
    //       synchronize: true,
    //       host: configService.get('DB_HOST'),
    //       port: configService.get('DB_PORT'),
    //       username: configService.get('DB_USERNAME'),
    //       password: configService.get('DB_PASSWORD'),
    //       database: configService.get('DB_DATABASE'),
    //       entities: [Article, User, Comment, Image],
    //     };
    //   },
    // }),
    MongooseModule.forRoot(
      'mongodb+srv://ekaterina_melnichuk:Habes-Jonas2013@cluster0.ehunkvg.mongodb.net/nestjs-nosql?retryWrites=true&w=majority',
    ),
    CommentsModule,
    ImagesModule,
  ],
  providers: [],
})
export class AppModule {}
