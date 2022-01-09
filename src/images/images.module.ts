import { Module } from '@nestjs/common';
import { Web3Module } from 'src/web3/web3.module';
import { ImagesController } from './images.controller';
import { ImagesService } from './images.service';

@Module({
  imports: [Web3Module],
  controllers: [ImagesController],
  providers: [ImagesService],
})
export class ImagesModule {}
