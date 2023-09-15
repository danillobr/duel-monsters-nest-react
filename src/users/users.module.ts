import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from './repositories/users.repository';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PassportModule } from '@nestjs/passport';
import { SpellsService } from '../cards/spells.service';
import { SpellsRepository } from '../cards/repositories/spells.repository';
import { TrapsService } from '../cards/traps.service';
import { TrapsRepository } from '../cards/repositories/traps.repository';
import { MonstersService } from '../cards/monsters.service';
import { MonstersRepository } from '../cards/repositories/monsters.repository';
import { DecksService } from '../decks/decks.service';
import { DecksRepository } from '../decks/repositories/decks.repository';
import { CustomError } from 'src/Errors/custom-errors.error';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersRepository]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [
    UsersService,
    UsersRepository,
    SpellsService,
    SpellsRepository,
    TrapsService,
    TrapsRepository,
    MonstersService,
    MonstersRepository,
    DecksService,
    DecksRepository,
    CustomError,
  ],
  controllers: [UsersController],
})
export class UsersModule {}
