import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { UserRepository } from 'src/users/repositories/users.repository';
import { SeedService } from './seed.service';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
  ],
  providers: [SeedService],
})
export class AuthModule {}
