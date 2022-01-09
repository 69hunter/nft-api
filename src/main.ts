import { NestApplicationOptions } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import {
  utilities as nestWinstonModuleUtilities,
  WinstonModule,
} from 'nest-winston';
import * as winston from 'winston';
import 'winston-daily-rotate-file';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const logger = WinstonModule.createLogger({
    transports: [
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.timestamp(),
          nestWinstonModuleUtilities.format.nestLike(),
        ),
      }),
      new winston.transports.DailyRotateFile({
        dirname: 'logs',
        filename: '%DATE%.error.log',
        datePattern: 'YYYY-MM-DD-HH',
        maxSize: '20m',
        maxFiles: '14d',
        level: 'error',
      }),
      new winston.transports.DailyRotateFile({
        dirname: 'logs',
        filename: '%DATE%.combined.log',
        datePattern: 'YYYY-MM-DD-HH',
        maxSize: '20m',
        maxFiles: '14d',
      }),
    ],
    exceptionHandlers: [
      new winston.transports.DailyRotateFile({
        dirname: 'logs',
        filename: '%DATE%.exceptions.log',
        datePattern: 'YYYY-MM-DD-HH',
        maxSize: '20m',
        maxFiles: '14d',
      }),
    ],
  });

  logger.log(`Application is running in "${process.env.NODE_ENV}" mode`);

  const nestAppOptions: NestApplicationOptions = {
    logger: logger,
    cors: true,
  };

  const app = await NestFactory.create(AppModule, nestAppOptions);

  // To serve large image files
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

  // prefix with versioning
  const apiVersion = 'v1';
  const apiBasePath = `api/${apiVersion}`;
  app.setGlobalPrefix(apiBasePath);

  const options = new DocumentBuilder()
    .setTitle('API documentation')
    .setVersion(apiVersion)
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(`${apiBasePath}/doc`, app, document);

  const port = 3000;
  await app.listen(port);
  logger.log(`Application is listening on port ${port}`);
  logger.log(`Swagger doc at: ${apiBasePath}/doc`);
}
bootstrap();
