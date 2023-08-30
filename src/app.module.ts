import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
// import { LoggerInterceptor } from './interceptors/logger.interceptor';
import { MailerModule } from '@nestjs-modules/mailer';
import { mailerConfig } from './configs/mailer.config';
import { dataSourceOptions } from './db/data-source-cli';
import { CardsModule } from './cards/cards.module';
import { DecksModule } from './decks/decks.module';
import 'dotenv/config';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    MailerModule.forRoot(mailerConfig),
    UsersModule,
    AuthModule,
    CardsModule,
    DecksModule,
  ],
  controllers: [],
  // providers: [
  //   {
  //     provide: APP_INTERCEPTOR,
  //     useClass: LoggerInterceptor,
  //   },
  // ],
})
export class AppModule {}
