import { Injectable } from '@nestjs/common';
import { UpdateCardDto } from './dto/update-card.dto';
import { Card } from './entities/card.entity';
import { TrapsRepository } from './repositories/trap.repository';
import { CreateTrapDto } from './dto/create-trap.dto';

@Injectable()
export class TrapsService {
  constructor(private readonly trapsRepository: TrapsRepository) {}

  async create(createCardDto: CreateTrapDto): Promise<Card> {
    return await this.trapsRepository.createTrap(createCardDto);
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
