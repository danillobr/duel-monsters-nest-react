import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './repositories/users.repository';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PassportModule } from '@nestjs/passport';
import { SpellsService } from '../cards/spells.service';
import { SpellsRepository } from '../cards/repositories/spells.repository';
import { TrapsService } from '../cards/traps.service';
import { TrapsRepository } from '../cards/repositories/traps.repository';
import { MonstersService } from '../cards/monsters.service';
import { MonstersRepository } from '../cards/repositories/monsters.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [
    UsersService,
    UserRepository,
    SpellsService,
    SpellsRepository,
    TrapsService,
    TrapsRepository,
    MonstersService,
    MonstersRepository,
  ],
  controllers: [UsersController],
})
export class UsersModule {}
