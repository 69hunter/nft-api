import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
  StreamableFile,
} from '@nestjs/common';
import { createReadStream } from 'fs';
import { join } from 'path';
import { Web3Service } from 'src/web3/web3.service';

@Injectable()
export class ImagesService {
  private readonly logger = new Logger(ImagesService.name);
  private readonly imagesFolderPath = join(
    __dirname,
    '..',
    'resources',
    'images',
  );

  constructor(private readonly web3Service: Web3Service) {}

  async findOne(filename: string): Promise<StreamableFile> {
    let tokenId: string;
    let fileExtension: string;

    try {
      [tokenId, fileExtension] = filename.split('.');
    } catch (e) {
      throw new BadRequestException();
    }
    const shouldReveal = await this.web3Service.hasMinted(Number(tokenId));

    if (!shouldReveal) {
      throw new NotFoundException();
    }

    const file = createReadStream(
      `${this.imagesFolderPath}/${tokenId}.${fileExtension}`,
    );
    return new StreamableFile(file);
  }
}
