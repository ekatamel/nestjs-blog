import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Image } from './image.model';

@Injectable()
export class ImagesService {
  constructor(@InjectModel('Image') private imageModel: Model<Image>) {}

  async createImage(file: Express.Multer.File) {
    const image = new this.imageModel({
      name: file.filename,
    });

    const result = await image.save();

    return result;
  }
  async getImage(id: string) {
    const image = await this.imageModel.findOne({ id });

    if (!image) {
      throw new NotFoundException("Image doesn't exist");
    }

    return image;
  }

  async deleteImage(id: string) {
    const image = this.getImage(id);
    if (!image) {
      throw new NotFoundException("Image doesn't exist");
    }
    await this.imageModel.remove(image);
  }
}
