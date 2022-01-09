import { Controller, Get, HttpCode, Param } from '@nestjs/common';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MetadataResponseDto } from './dto/metadata.response.dto';
import { MetadatasService } from './metadatas.service';

@Controller('metadatas')
@ApiTags('Metadatas')
export class MetadatasController {
  constructor(private readonly metadatasService: MetadatasService) {}

  @Get(':id')
  @ApiParam({ name: 'id', type: 'number' })
  @HttpCode(200)
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  findOne(@Param('id') id: number): Promise<MetadataResponseDto> {
    return this.metadatasService.findOne(id);
  }
}
