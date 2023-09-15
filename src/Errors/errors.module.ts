import { Module } from '@nestjs/common';
import { CustomError } from './custom-errors.error';

@Module({
  imports: [],
  controllers: [],
  providers: [CustomError],
  exports: [CustomError],
})
export class ErrorsModule {}
