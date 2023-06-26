import { Module } from '@nestjs/common';
import { SeedController } from './seed.controller';
import { SeedService } from './seed.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from '../data-source';
import { UsersModule } from 'src/users/users.module';
import { UserRepository } from 'src/users/repositories/users.repository';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    UsersModule,
  ],
  controllers: [SeedController],
  providers: [SeedService, UserRepository]
})
export class SeedModule {}
