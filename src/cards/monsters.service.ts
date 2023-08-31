import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateCardDto } from './dto/update-card.dto';
import { CreateMonsterDto } from './dto/create-monster.dto';
import { Card } from './entities/card.entity';
import { MonstersRepository } from './repositories/monsters.repository';
import { Monster } from './entities/monster.entity';

@Injectable()
export class MonstersService {
  constructor(private readonly monstersRepository: MonstersRepository) {}

  async create(createCardDto: CreateMonsterDto): Promise<Card> {
    return await this.monstersRepository.createMonster(createCardDto);
  }

  findAll() {
    return `This action returns all cards`;
  }

  async findCardById(id: string): Promise<Monster> {
    const card = await this.monstersRepository.findById(id);
    if (!card) throw new NotFoundException('Carta não encontrada');
    return card;
  }

  async findCardByName(name: string): Promise<Monster> {
    const card = await this.monstersRepository.findById(name);
    if (!card) throw new NotFoundException('Carta não encontrada');
    return card;
  }

  update(id: number, updateCardDto: UpdateCardDto) {
    return `This action updates a #${id} card`;
  }

  async remove(id: string) {
    const result = await this.monstersRepository.delete({ id });
    if (result.affected === 0) {
      throw new NotFoundException('Não foi encontrada a carta do ID informado');
    }
  }

  async findCardByIdAndUserId(
    cardId: string,
    userId: string,
  ): Promise<Monster> {
    const card = await this.monstersRepository.findByIdAndUserId(
      cardId,
      userId,
    );
    if (!card)
      throw new NotFoundException(
        'Carta não encontrada, certifique-se de usar o id correto',
      );
    return card;
  }
}
