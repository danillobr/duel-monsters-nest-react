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
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

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

  const config = new DocumentBuilder()
    .setTitle('Documentação com Swagger - Duel Monsters')
    .setDescription(
      '"Duel Monsters" é um projeto em NestJS, trazendo o emocionante mundo do Yu-Gi-Oh! para a sua tela. Desenvolvido para entusiastas do jogo, oferece a experiência autêntica de duelos de cartas colecionáveis online, com personalização de decks. Entre em ação e prepare-se para duelar!.',
    )
    .setVersion('1.0')
    .addTag('users')
    .addTag('auth')
    .addTag('decks')
    .addTag('cards')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  await app.listen(3333);
}

bootstrap();
