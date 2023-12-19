import { DataSource, Repository } from 'typeorm';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Card } from '../entities/card.entity';
import { Trap } from '../entities/trap.entity';
import { CreateTrapDto } from '../dtos/create-trap.dto';

@Injectable()
export class TrapsRepository extends Repository<Trap> {
  constructor(private readonly dataSource: DataSource) {
    super(Trap, dataSource.createEntityManager());
  }

  async createTrap(createTrapDto: CreateTrapDto): Promise<Card> {
    const { description, effectDuration, img, name, symbol } = createTrapDto;
    const card = this.create();
    card.description = description;
    card.img = img;
    card.name = name;
    card.effectDuration = effectDuration;
    card.symbol = symbol;
    try {
      await card.save();
      return card;
    } catch (error) {
      if (error.code.toString() === '23505') {
        throw new ConflictException(
          'Uma carta com esse nome já foi cadastrada',
        );
      } else {
        throw new InternalServerErrorException(
          'Erro ao salvar salvar carta no banco de dados',
        );
      }
    }
  }

  async findByName(name: string): Promise<Trap> {
    return await this.findOne({ where: { name } });
  }

  async findById(id: string): Promise<Trap> {
    return await this.findOne({ where: { id } });
  }
}
