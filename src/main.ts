import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { useContainer } from 'class-validator';
import * as dotenv from 'dotenv';
import { WinstonModule } from 'nest-winston';
import { winstonConfig } from './configs/winston.config';
dotenv.config();

async function bootstrap() {
  const logger = WinstonModule.createLogger(winstonConfig);
  const app = await NestFactory.create(AppModule, { logger });

  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     transform: true,
  //   }),
  // );

  // useContainer(app.select(AppModule), { fallbackOnErrors: true });
  await app.listen(3333);
}

bootstrap();
