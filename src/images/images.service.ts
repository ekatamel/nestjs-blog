import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Image } from './image.entity';

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(Image)
    private imagesRepository: Repository<Image>,
  ) {}

  async createImage(file: Express.Multer.File) {
    const image = this.imagesRepository.create({
      name: file.filename,
    });

    await this.imagesRepository.save(image);

    return image;
  }
  async getImage(id: string) {
    const image = await this.imagesRepository.findOneBy({ id });

    if (!image) {
      throw new NotFoundException("Comment doesn't exist");
    }

    return image;
  }

  async deleteImage(id: string) {
    const result = await this.imagesRepository.delete({ id });

    if (result.affected == 0) {
      throw new NotFoundException("Image doesn't exist");
    }

    //OR
    // const image = this.getImage(imageId);
    // await this.imagesRepository.remove(image);
  }
}
