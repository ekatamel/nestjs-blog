import {
  Controller,
  Get,
  Param,
  Post,
  Delete,
  UploadedFile,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { ImagesService } from './images.service';

@Controller('images')
export class ImagesController {
  constructor(private imageService: ImagesService) {}

  @Get('/:id')
  getImageById(@Param('id') id: string) {
    return this.imageService.getImage(id);
  }

  @Delete('/:id')
  deleteImage(@Param('id') id: string) {
    return this.imageService.deleteImage(id);
  }
}
