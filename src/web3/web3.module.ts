import { Module } from '@nestjs/common';
import { Web3Service } from './web3.service';
import { EthersModule, MAINNET_NETWORK, RINKEBY_NETWORK } from 'nestjs-ethers';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { smartContractConfig } from 'src/config/smart-contract.config';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [smartContractConfig] }),
    EthersModule.forRootAsync({
      imports: [ConfigModule.forFeature(smartContractConfig)],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const Networks = {
          rinkeby: RINKEBY_NETWORK,
          mainnet: MAINNET_NETWORK,
        };

        return {
          network: Networks[configService.get('smartContract.network')],
          infura: {
            projectId: configService.get('smartContract.infuraProjectId'),
            projectSecret: configService.get(
              'smartContract.infuraProjectSecret',
            ),
          },
          useDefaultProvider: false,
        };
      },
    }),
  ],
  providers: [Web3Service],
  exports: [Web3Service],
})
export class Web3Module {}
