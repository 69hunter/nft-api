import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MetadatasModule } from './metadatas/metadatas.module';
import { ImagesModule } from './images/images.module';
import { Web3Module } from './web3/web3.module';

@Module({
  imports: [MetadatasModule, ImagesModule, Web3Module],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
