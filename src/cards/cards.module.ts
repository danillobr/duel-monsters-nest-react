import { Module } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CardsController } from './cards.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { MonstersRepository } from './repositories/monsters.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([MonstersRepository]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [CardsController],
  providers: [CardsService],
})
export class CardsModule {}
