import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ImagesService } from './images.service';
import { Image } from './entities/image.entity';
import { CreateImageInput } from './dto/create-image.input';

@Resolver(() => Image)
export class ImagesResolver {
  constructor(private readonly imagesService: ImagesService) {}

  @Mutation(() => Image)
  createImage(@Args('createImageInput') createImageInput: CreateImageInput) {
    return this.imagesService.createImage(createImageInput);
  }

  @Query(() => Image, { name: 'image' })
  getImage(@Args('id', { type: () => String }) id: string) {
    return this.imagesService.getImage(id);
  }

  @Mutation(() => Image)
  removeImage(@Args('id', { type: () => String }) id: string) {
    return this.imagesService.deleteImage(id);
  }
}
