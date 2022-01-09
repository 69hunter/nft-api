import { Module } from '@nestjs/common';
import { Web3Module } from 'src/web3/web3.module';
import { MetadatasController } from './metadatas.controller';
import { MetadatasService } from './metadatas.service';

@Module({
  imports: [Web3Module],
  controllers: [MetadatasController],
  providers: [MetadatasService],
})
export class MetadatasModule {}
