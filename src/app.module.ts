import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { typeOrmConfig } from './configs/typeorm.config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import * as dotenv from 'dotenv';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggerInterceptor } from './interceptors/logger.interceptor';
import { WinstonModule } from 'nest-winston';
import { winstonConfig } from './configs/winston.config';
import { MailerModule } from '@nestjs-modules/mailer';
import { mailerConfig } from './configs/mailer.config';
import { dataSourceOptions } from './db/data-source';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    WinstonModule.forRoot(winstonConfig),
    MailerModule.forRoot(mailerConfig),
    UsersModule,
    AuthModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggerInterceptor,
    },
  ],
})
export class AppModule {}
