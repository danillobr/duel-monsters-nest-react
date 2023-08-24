import { DataSource, Repository } from 'typeorm';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Card } from '../entities/card.entity';
import { CreateMonsterDto } from '../dto/create-monster.dto';
import { Monster } from '../entities/monster.entities';

@Injectable()
export class MonstersRepository extends Repository<Monster> {
  constructor(private dataSource: DataSource) {
    super(Monster, dataSource.createEntityManager());
  }

  async createMonster(createMonsterDto: CreateMonsterDto): Promise<Card> {
    const { atk, def, description, img, level, name, specialAbility } =
      createMonsterDto;
    const card = this.create();
    card.atk = atk;
    card.def = def;
    card.description = description;
    card.img = img;
    card.level = level;
    card.name = name;
    card.specialAbility = specialAbility;
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
