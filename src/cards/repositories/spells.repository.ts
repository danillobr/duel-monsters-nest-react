import { DataSource, Repository } from 'typeorm';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Card } from '../entities/card.entity';
import { Spell } from '../entities/spell.entity';
import { CreateSpellDto } from '../dto/create-spell.dto';

@Injectable()
export class SpellsRepository extends Repository<Spell> {
  constructor(private dataSource: DataSource) {
    super(Spell, dataSource.createEntityManager());
  }

  async createSpellCard(createSpellCardDto: CreateSpellDto): Promise<Card> {
    const { description, effectDuration, img, name, symbol } =
      createSpellCardDto;
    const card = new Spell();

    card.description = description;
    card.effectDuration = effectDuration;
    card.img = img;
    card.name = name;
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

  async findByName(name: string): Promise<Spell> {
    return await this.findOne({ where: { name } });
  }

  async findById(id: string): Promise<Spell> {
    return await this.findOne({ where: { id } });
  }
}
