import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { join } from 'path';
import * as fs from 'fs';
import { plainToClass } from 'class-transformer';
import { MetadataResponseDto } from './dto/metadata.response.dto';
import { MetadataEntity } from './entity/metadata.entity';
import { Web3Service } from 'src/web3/web3.service';

@Injectable()
export class MetadatasService {
  private readonly logger = new Logger(MetadatasService.name);
  private readonly metadatasFolderPath = join(
    __dirname,
    '..',
    'resources',
    'metadatas',
  );

  constructor(private readonly web3Service: Web3Service) {}

  async findOne(id: number): Promise<MetadataResponseDto> {
    const shouldReveal = await this.web3Service.hasMinted(Number(id));

    if (!shouldReveal) {
      throw new NotFoundException();
    }

    const dataRaw = await fs.promises.readFile(
      `${this.metadatasFolderPath}/${id}.json`,
      'utf8',
    );
    const obj = plainToClass(MetadataEntity, dataRaw);
    return obj;
  }
}
