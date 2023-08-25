import { Module } from '@nestjs/common';
import { CardsController } from './cards.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { MonstersRepository } from './repositories/monsters.repository';
import { MonstersService } from './monsters.service';
import { TrapsService } from './trap.service';
import { TrapsRepository } from './repositories/trap.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([MonstersRepository]),
    // PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [
    MonstersService,
    TrapsService,
    MonstersRepository,
    TrapsRepository,
  ],
  controllers: [CardsController],
})
export class CardsModule {}
