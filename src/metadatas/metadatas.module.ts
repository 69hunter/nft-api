import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { serverConfig } from 'src/config/server.config';
import { Web3Module } from 'src/web3/web3.module';
import { MetadatasController } from './metadatas.controller';
import { MetadatasService } from './metadatas.service';

@Module({
  imports: [Web3Module, ConfigModule.forRoot({ load: [serverConfig] })],
  controllers: [MetadatasController],
  providers: [MetadatasService],
})
export class MetadatasModule {}
