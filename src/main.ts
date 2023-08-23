import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { useContainer } from 'class-validator';
import 'dotenv/config';
import {
  utilities as nestWinstonModuleUtilities,
  WinstonModule,
} from 'nest-winston';
const { Logtail } = require('@logtail/node');
const { LogtailTransport } = require('@logtail/winston');
import * as winston from 'winston';

// const logtail = new Logtail(process.env.TOKEN_LOGTAIL);

async function bootstrap() {
  // let app = await NestFactory.create(AppModule, {
  //   logger: WinstonModule.createLogger({
  //     transports: [new LogtailTransport(logtail)],
  //   }),
  // });

  // const logger = WinstonModule.createLogger(winstonConfig);
  // const app = await NestFactory.create(AppModule, { logger });
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  await app.listen(3333);
}

bootstrap();
