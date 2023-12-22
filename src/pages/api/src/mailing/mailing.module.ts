import { Module } from '@nestjs/common';
import { MailingService } from './mailing.service';

@Module({
  controllers: [],
  providers: [MailingService],
  exports: [MailingService],
})
export class MailingModule {}
