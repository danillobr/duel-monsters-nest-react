import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from '../data-source-cli';
import { UsersModule } from '../../users/users.module';
import { UserRepository } from '../../users/repositories/users.repository';

@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions), UsersModule],
  controllers: [],
  providers: [UserRepository],
})
export class SeedModule {}
