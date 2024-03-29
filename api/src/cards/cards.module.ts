import { Module } from '@nestjs/common';
import { CardsController } from './cards.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { MonstersRepository } from './repositories/monsters.repository';
import { MonstersService } from './monsters.service';
import { TrapsService } from './traps.service';
import { TrapsRepository } from './repositories/traps.repository';
import { SpellsRepository } from './repositories/spells.repository';
import { SpellsService } from './spells.service';
import { UsersCardsService } from './users-cards.service';
import { UsersCardsRepository } from './repositories/users-cards.repository';
import { DecksRepository } from '../decks/repositories/decks.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([MonstersRepository]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [
    MonstersService,
    SpellsService,
    TrapsService,
    MonstersRepository,
    SpellsRepository,
    TrapsRepository,
    UsersCardsService,
    UsersCardsRepository,
    DecksRepository,
  ],
  controllers: [CardsController],
  exports: [UsersCardsService, UsersCardsRepository],
})
export class CardsModule {}
