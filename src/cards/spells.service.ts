import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateCardDto } from './dto/update-card.dto';
import { Card } from './entities/card.entity';
import { TrapsRepository } from './repositories/traps.repository';
import { CreateTrapDto } from './dto/create-trap.dto';
import { SpellsRepository } from './repositories/spells.repository';
import { CreateSpellDto } from './dto/create-spell.dto';
import { Spell } from './entities/spell.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class SpellsService {
  constructor(private readonly spellsRepository: SpellsRepository) {}

  async create(createCardDto: CreateSpellDto): Promise<Card> {
    return await this.spellsRepository.createSpellCard(createCardDto);
  }

  findAll() {
    return `This action returns all cards`;
  }

  async findCardById(id: string): Promise<Spell> {
    const card = await this.spellsRepository.findById(id);
    if (!card) throw new NotFoundException('Carta não encontrada');
    return card;
  }

  async findCardByName(name: string): Promise<Spell> {
    const card = await this.spellsRepository.findById(name);
    if (!card) throw new NotFoundException('Carta não encontrada');
    return card;
  }

  update(id: number, updateCardDto: UpdateCardDto) {
    return `This action updates a #${id} card`;
  }

  async remove(cardId: string) {
    const result = await this.spellsRepository.delete({ id: cardId });
    if (result.affected === 0) {
      throw new NotFoundException('Não foi encontrada a carta do ID informado');
    }
  }

  async findCardByIdAndUserId(cardId: string, userId: string): Promise<Spell> {
    const card = await this.spellsRepository.findByIdAndUserId(cardId, userId);
    if (!card)
      throw new NotFoundException(
        'Carta não encontrada, certifique-se de usar o id correto',
      );
    return card;
  }
}
