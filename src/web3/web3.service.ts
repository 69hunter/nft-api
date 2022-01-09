import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import {
  InjectContractProvider,
  EthersContract,
  Contract,
} from 'nestjs-ethers';
import { smartContractConfig } from 'src/config/smart-contract.config';

const ABI = [
  {
    inputs: [{ internalType: 'uint256', name: 'tokenId', type: 'uint256' }],
    name: 'ownerOf',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
];

@Injectable()
export class Web3Service {
  private readonly logger = new Logger(Web3Service.name);

  constructor(
    @InjectContractProvider()
    private readonly ethersContract: EthersContract,
    @Inject(smartContractConfig.KEY)
    private readonly config: ConfigType<typeof smartContractConfig>,
  ) {}

  async ownerOf(tokenId: number): Promise<string> {
    const contract: Contract = this.ethersContract.create(
      this.config.erc721Address,
      ABI,
    );

    const ownerAddress: string = await contract.ownerOf(tokenId);
    return ownerAddress;
  }

  async hasMinted(tokenId: number): Promise<boolean> {
    try {
      await this.ownerOf(tokenId);
      return true;
    } catch (e) {
      // This means token is not exist, not minted yet
      if (e.reason === 'ERC721: owner query for nonexistent token') {
        return false;
      } else {
        throw e;
      }
    }
  }
}
