import { Injectable } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { Monster } from './entities/monster.entity';
import { CreateMonsterDto } from './dto/create-monster.dto';
import { Card } from './entities/card.entity';
import { MonstersRepository } from './repositories/monsters.repository';

@Injectable()
export class MonstersService {
  constructor(private readonly monstersRepository: MonstersRepository) {}

  async create(createCardDto: CreateMonsterDto): Promise<Card> {
    return await this.monstersRepository.createMonster(createCardDto);
  }

  findAll() {
    return `This action returns all cards`;
  }

  findOne(id: number) {
    return `This action returns a #${id} card`;
  }

  update(id: number, updateCardDto: UpdateCardDto) {
    return `This action updates a #${id} card`;
  }

  remove(id: number) {
    return `This action removes a #${id} card`;
  }
}
