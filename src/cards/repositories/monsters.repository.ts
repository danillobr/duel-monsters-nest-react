import { DataSource, Repository } from 'typeorm';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Card } from '../entities/card.entity';
import { CreateMonsterDto } from '../dtos/create-monster.dto';
import { Monster } from '../entities/monster.entity';

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

  async findByName(name: string): Promise<Monster> {
    return await this.findOne({ where: { name } });
  }

  async findById(id: string): Promise<Monster> {
    return await this.findOne({ where: { id } });
  }
}
