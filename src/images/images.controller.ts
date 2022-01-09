import {
  Controller,
  Get,
  HttpCode,
  Param,
  StreamableFile,
} from '@nestjs/common';
import { ApiTags, ApiParam, ApiResponse } from '@nestjs/swagger';
import { ImagesService } from './images.service';

@Controller('images')
@ApiTags('Images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Get(':filename')
  @ApiParam({ name: 'filename', type: 'string' })
  @HttpCode(200)
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  findOne(@Param('filename') filename: string): Promise<StreamableFile> {
    return this.imagesService.findOne(filename);
  }
}
