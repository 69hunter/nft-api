import { registerAs } from '@nestjs/config';

export const smartContractConfig = registerAs('smartContract', () => ({
  network: process.env.SMART_CONTRACT_NETWORK,
  infuraProjectId: process.env.SMART_CONTRACT_INFURA_PROJECT_ID,
  infuraProjectSecret: process.env.SMART_CONTRACT_INFURA_PROJECT_SECRET,
  erc721Address: process.env.SMART_CONTRACT_ERC721_ADDRESS,
}));
