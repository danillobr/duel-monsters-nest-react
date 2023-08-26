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

@Module({
  imports: [
    TypeOrmModule.forFeature([MonstersRepository]),
    // PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [
    MonstersService,
    SpellsService,
    TrapsService,
    MonstersRepository,
    SpellsRepository,
    TrapsRepository,
  ],
  controllers: [CardsController],
})
export class CardsModule {}
