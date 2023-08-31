import { Module } from '@nestjs/common';
import { DecksService } from './decks.service';
import { DecksController } from './decks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { DecksRepository } from './repositories/decks.repository';
import { UsersRepository } from 'src/users/repositories/users.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([DecksRepository]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [DecksController],
  providers: [DecksService, DecksRepository],
  exports: [DecksService, DecksRepository],
})
export class DecksModule {}
