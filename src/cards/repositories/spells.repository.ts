import { DataSource, Repository } from 'typeorm';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Card } from '../entities/card.entity';
import { Spell } from '../entities/spell.entity';
import { CreateSpellDto } from '../dto/create-spell.dto';

@Injectable()
export class SpellsRepository extends Repository<Spell> {
  constructor(private dataSource: DataSource) {
    super(Spell, dataSource.createEntityManager());
  }

  async createSpell(createSpellDto: CreateSpellDto): Promise<Card> {
    const { description, effectDuration, img, name, symbol } = createSpellDto;
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
