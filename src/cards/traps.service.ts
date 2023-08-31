import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateCardDto } from './dto/update-card.dto';
import { Card } from './entities/card.entity';
import { TrapsRepository } from './repositories/traps.repository';
import { CreateTrapDto } from './dto/create-trap.dto';
import { Trap } from './entities/trap.entity';

@Injectable()
export class TrapsService {
  constructor(private readonly trapsRepository: TrapsRepository) {}

  async create(createCardDto: CreateTrapDto): Promise<Card> {
    return await this.trapsRepository.createTrap(createCardDto);
  }

  findAll() {
    return `This action returns all cards`;
  }

  async findCardById(id: string): Promise<Trap> {
    const card = await this.trapsRepository.findById(id);
    if (!card) throw new NotFoundException('Carta não encontrada');
    return card;
  }

  async findCardByName(name: string): Promise<Trap> {
    const card = await this.trapsRepository.findById(name);
    if (!card) throw new NotFoundException('Carta não encontrada');
    return card;
  }

  update(id: number, updateCardDto: UpdateCardDto) {
    return `This action updates a #${id} card`;
  }

  async remove(cardId: string) {
    const result = await this.trapsRepository.delete({ id: cardId });
    if (result.affected === 0) {
      throw new NotFoundException('Não foi encontrada a carta do ID informado');
    }
  }

  async findCardByIdAndUserId(cardId: string, userId: string): Promise<Trap> {
    const card = await this.trapsRepository.findByIdAndUserId(cardId, userId);
    if (!card)
      throw new NotFoundException(
        'Carta não encontrada, certifique-se de usar o id correto',
      );
    return card;
  }
}
