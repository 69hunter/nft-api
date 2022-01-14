import { registerAs } from '@nestjs/config';

export const serverConfig = registerAs('server', () => ({
  baseURI: process.env.SERVER_BASEURI,
}));
