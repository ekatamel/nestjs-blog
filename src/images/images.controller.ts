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
import { AuthGuard } from 'src/guards/auth.guard';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Images')
@Controller('images')
export class ImagesController {
  constructor(private imageService: ImagesService) {}

  @Get('/:id')
  @ApiOperation({ summary: 'Get image by ID' })
  @ApiResponse({
    status: 404,
    description: "Image doesn't exist",
  })
  getImageById(@Param('id') id: string) {
    return this.imageService.getImage(id);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard)
  @ApiResponse({
    status: 404,
    description: "Image doesn't exist",
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden',
  })
  @ApiOperation({ summary: 'Delete image by ID' })
  deleteImage(@Param('id') id: string) {
    return this.imageService.deleteImage(id);
  }
}
