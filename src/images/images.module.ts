import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImagesController } from './images.controller';
import { ImagesService } from './images.service';
import { Image } from './image.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { ImageSchema } from './image.model';

@Module({
  imports: [
    // TypeOrmModule.forFeature([Image]),
    MongooseModule.forFeature([{ name: 'Image', schema: ImageSchema }]),
  ],
  controllers: [ImagesController],
  providers: [ImagesService],
  exports: [ImagesService],
})
export class ImagesModule {}
