import { Injectable } from '@nestjs/common';
import { UpdateCardDto } from './dto/update-card.dto';
import { Card } from './entities/card.entity';
import { TrapsRepository } from './repositories/traps.repository';
import { CreateTrapDto } from './dto/create-trap.dto';
import { SpellsRepository } from './repositories/spells.repository';
import { CreateSpellDto } from './dto/create-spell.dto';

@Injectable()
export class SpellsService {
  constructor(private readonly spellsRepository: SpellsRepository) {}

  async create(createCardDto: CreateSpellDto): Promise<Card> {
    return await this.spellsRepository.createSpell(createCardDto);
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
