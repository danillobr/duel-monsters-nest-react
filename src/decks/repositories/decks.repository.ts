import { DataSource, Repository } from 'typeorm';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Deck } from '../entities/deck.entity';
import { User } from '../../users/entities/user.entity';

@Injectable()
export class DecksRepository extends Repository<Deck> {
  constructor(private dataSource: DataSource) {
    super(Deck, dataSource.createEntityManager());
  }

  async createDeck(name: string, user: User): Promise<Deck> {
    const deck = this.create();
    deck.name = name;
    deck.user = user;
    try {
      await deck.save();
      return deck;
    } catch (error) {
      if (error.code.toString() === '23505') {
        throw new ConflictException('Já existe um deck com esse nome');
      } else {
        throw new InternalServerErrorException(
          'Erro ao salvar o deck no banco de dados',
        );
      }
    }
  }

  async findById(deckId: string): Promise<Deck> {
    return await this.findOne({ where: { id: deckId } });
  }
}
