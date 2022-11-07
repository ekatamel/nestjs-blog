import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Image } from './entities/image.entity';
import { Repository } from 'typeorm';
import { CreateImageInput } from './dto/create-image.input';

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(Image) private imagesRepository: Repository<Image>,
  ) {}

  async createImage(createImageInput: CreateImageInput) {
    const { name, articleId } = createImageInput;
    const image = this.imagesRepository.create({
      name,
      articleId,
    });

    await this.imagesRepository.save(image);

    return image;
  }

  async getImage(id: string) {
    const image = await this.imagesRepository.findOneBy({ id });

    if (!image) {
      throw new NotFoundException("Image doesn't exist");
    }

    return image;
  }

  async deleteImage(id: string) {
    const result = await this.imagesRepository.delete({ id });

    if (result.affected == 0) {
      throw new NotFoundException("Image doesn't exist");
    }
  }
}
