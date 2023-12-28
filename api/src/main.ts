import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { useContainer } from 'class-validator';
import 'dotenv/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
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
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  app.enableCors({
    origin: process.env.FRONTEND_URL, // Substitua pelo URL do seu frontend
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  await app.listen(3333);
}

bootstrap();
