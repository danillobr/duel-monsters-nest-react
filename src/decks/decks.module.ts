import { Module } from '@nestjs/common';
import { DecksService } from './decks.service';
import { DecksController } from './decks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { DecksRepository } from './repositories/decks.repository';
import { UsersCardsService } from '../cards/users-cards.service';
import { UsersCardsRepository } from '../cards/repositories/users-cards.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([DecksRepository]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [DecksController],
  providers: [DecksService, DecksRepository, UsersCardsRepository],
})
export class DecksModule {}
