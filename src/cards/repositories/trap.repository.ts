import { DataSource, Repository } from 'typeorm';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Card } from '../entities/card.entity';
import { CreateMonsterDto } from '../dto/create-monster.dto';
import { Monster } from '../entities/monster.entity';
import { Trap } from '../entities/trap.entity';
import { CreateTrapDto } from '../dto/create-trap.dto';
import { TrapSymbol } from '../trap-symbol.enum';

@Injectable()
export class TrapsRepository extends Repository<Trap> {
  constructor(private dataSource: DataSource) {
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
      throw new InternalServerErrorException(
        'Erro ao salvar a carta no banco de dados',
      );
    }
  }
}
